namespace NetMetric.Messaging.Abstractions;

public sealed record IntegrationEventMetadata(
    Guid EventId,
    string EventName,
    int EventVersion,
    string Source,
    DateTime OccurredAtUtc,
    string? CorrelationId,
    string? TraceId);
