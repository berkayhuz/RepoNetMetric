using FluentAssertions;
using Microsoft.Extensions.Options;
using NetMetric.CRM.CustomerManagement.Domain.Outbox;
using NetMetric.CRM.CustomerManagement.Infrastructure.Outbox;
using NetMetric.Messaging.Abstractions;
using NetMetric.Messaging.RabbitMq.Options;

namespace NetMetric.CRM.CustomerManagement.UnitTests.Outbox;

public sealed class CustomerManagementOutboxPublisherTests
{
    [Fact]
    public async Task PublishAsync_Should_Use_Outbox_Metadata_And_Routing_Key()
    {
        var inner = new CapturingIntegrationEventPublisher();
        var options = Options.Create(new RabbitMqOptions { Exchange = "netmetric.integration" });
        var sut = new RabbitMqCustomerManagementOutboxPublisher(inner, options);
        var message = CustomerManagementOutboxMessage.Create(
            Guid.NewGuid(),
            "notification.requested",
            1,
            "notification.requested.v1",
            """{"subject":"created"}""",
            DateTimeOffset.UtcNow,
            "corr-1",
            "idem-1");

        await sut.PublishAsync(message, CancellationToken.None);

        inner.Exchange.Should().Be("netmetric.integration");
        inner.RoutingKey.Should().Be("notification.requested.v1");
        inner.Message.Should().NotBeNull();
        inner.Message!.Metadata.EventId.Should().Be(message.Id);
        inner.Message.Metadata.EventName.Should().Be(message.EventName);
        inner.Message.Metadata.CorrelationId.Should().Be("corr-1");
        inner.Message.Payload.Should().Be(message.PayloadJson);
    }

    [Fact]
    public void CalculateBackoff_Should_Be_Bounded()
    {
        var delay = CustomerManagementOutboxProcessor.CalculateBackoff(10, 30);

        delay.Should().BeGreaterThan(TimeSpan.Zero);
        delay.Should().BeLessThan(TimeSpan.FromSeconds(36));
    }

    private sealed class CapturingIntegrationEventPublisher : IIntegrationEventPublisher
    {
        public string? Exchange { get; private set; }
        public string? RoutingKey { get; private set; }
        public IntegrationMessage? Message { get; private set; }

        public Task PublishAsync(string exchange, string routingKey, IntegrationMessage message, CancellationToken cancellationToken)
        {
            Exchange = exchange;
            RoutingKey = routingKey;
            Message = message;
            return Task.CompletedTask;
        }
    }
}
