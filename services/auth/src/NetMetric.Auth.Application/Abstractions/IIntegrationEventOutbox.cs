namespace NetMetric.Auth.Application.Abstractions;

public interface IIntegrationEventOutbox
{
    Task AddAsync<TEvent>(
        Guid eventId,
        string eventName,
        int eventVersion,
        string routingKey,
        string source,
        TEvent payload,
        string? correlationId,
        string? traceId,
        DateTime occurredAtUtc,
        CancellationToken cancellationToken);
}
