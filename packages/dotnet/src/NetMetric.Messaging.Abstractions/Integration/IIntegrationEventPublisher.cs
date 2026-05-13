namespace NetMetric.Messaging.Abstractions;

public interface IIntegrationEventPublisher
{
    Task PublishAsync(
        string exchange,
        string routingKey,
        IntegrationMessage message,
        CancellationToken cancellationToken);
}
