using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NetMetric.Auth.Application.Options;
using NetMetric.Auth.Infrastructure.Persistence;
using NetMetric.Clock;
using NetMetric.Messaging.Abstractions;
using NetMetric.Messaging.RabbitMq.Options;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class OutboxPublisherService(
    IServiceScopeFactory scopeFactory,
    IOptions<OutboxOptions> options,
    IOptions<RabbitMqOptions> rabbitMqOptions,
    IClock clock,
    ILogger<OutboxPublisherService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var outboxOptions = options.Value;
        if (!outboxOptions.EnablePublisher)
        {
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await PublishBatchAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Outbox publisher batch failed.");
            }

            await Task.Delay(TimeSpan.FromSeconds(outboxOptions.PollingIntervalSeconds), stoppingToken);
        }
    }

    private async Task PublishBatchAsync(CancellationToken cancellationToken)
    {
        using var scope = scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
        var publisher = scope.ServiceProvider.GetRequiredService<IIntegrationEventPublisher>();
        var outboxOptions = options.Value;
        var utcNow = clock.UtcDateTime;
        var lockId = Guid.NewGuid();
        var lockedUntil = utcNow.AddSeconds(outboxOptions.LockSeconds);

        var candidateIds = await dbContext.OutboxMessages
            .Where(x => x.PublishedAtUtc == null)
            .Where(x => x.Attempts < outboxOptions.MaxAttempts)
            .Where(x => x.NextAttemptAtUtc == null || x.NextAttemptAtUtc <= utcNow)
            .Where(x => x.LockedUntilUtc == null || x.LockedUntilUtc <= utcNow)
            .OrderBy(x => x.CreatedAtUtc)
            .Select(x => x.Id)
            .Take(outboxOptions.BatchSize)
            .ToArrayAsync(cancellationToken);

        if (candidateIds.Length == 0)
        {
            return;
        }

        await dbContext.OutboxMessages
            .Where(x => candidateIds.Contains(x.Id))
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(x => x.LockId, lockId)
                .SetProperty(x => x.LockedUntilUtc, lockedUntil), cancellationToken);

        var messages = await dbContext.OutboxMessages
            .Where(x => x.LockId == lockId)
            .OrderBy(x => x.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        foreach (var message in messages)
        {
            try
            {
                await publisher.PublishAsync(
                    rabbitMqOptions.Value.Exchange,
                    message.RoutingKey,
                    new IntegrationMessage(
                        new IntegrationEventMetadata(
                            message.EventId,
                            message.EventName,
                            message.EventVersion,
                            message.Source,
                            message.OccurredAtUtc,
                            message.CorrelationId,
                            message.TraceId),
                        message.Payload),
                    cancellationToken);

                message.PublishedAtUtc = clock.UtcDateTime;
                message.LockId = null;
                message.LockedUntilUtc = null;
                message.LastError = null;
            }
            catch (Exception exception)
            {
                message.Attempts++;
                message.LastError = exception.ToString();
                message.LockId = null;
                message.LockedUntilUtc = null;
                message.NextAttemptAtUtc = clock.UtcDateTime.Add(ComputeBackoff(message.Attempts));

                logger.LogError(
                    exception,
                    "Outbox publish failed. EventId={EventId} EventName={EventName} Attempts={Attempts}",
                    message.EventId,
                    message.EventName,
                    message.Attempts);
            }
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static TimeSpan ComputeBackoff(int attempts)
    {
        var seconds = Math.Min(300, Math.Pow(2, Math.Min(attempts, 8)));
        return TimeSpan.FromSeconds(seconds);
    }
}
