using System.Text.Json;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Infrastructure.Persistence;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class IntegrationEventOutbox(AuthDbContext dbContext) : IIntegrationEventOutbox
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);

    public async Task AddAsync<TEvent>(
        Guid eventId,
        string eventName,
        int eventVersion,
        string routingKey,
        string source,
        TEvent payload,
        string? correlationId,
        string? traceId,
        DateTime occurredAtUtc,
        CancellationToken cancellationToken)
    {
        var outboxMessage = new OutboxMessage
        {
            EventId = eventId,
            EventName = eventName,
            EventVersion = eventVersion,
            Source = source,
            RoutingKey = routingKey,
            Payload = JsonSerializer.Serialize(payload, SerializerOptions),
            CorrelationId = correlationId,
            TraceId = traceId,
            OccurredAtUtc = occurredAtUtc,
            CreatedAtUtc = DateTime.UtcNow,
            NextAttemptAtUtc = DateTime.UtcNow
        };

        await dbContext.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }
}
