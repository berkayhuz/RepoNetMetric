namespace NetMetric.Messaging.Abstractions;

public sealed record IntegrationMessage(
    IntegrationEventMetadata Metadata,
    string Payload);
