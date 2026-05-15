// <copyright file="RabbitMqCustomerManagementOutboxPublisher.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using Microsoft.Extensions.Options;
using NetMetric.CRM.CustomerManagement.Domain.Outbox;
using NetMetric.Messaging.Abstractions;
using NetMetric.Messaging.RabbitMq.Options;

namespace NetMetric.CRM.CustomerManagement.Infrastructure.Outbox;

public sealed class RabbitMqCustomerManagementOutboxPublisher(
    IIntegrationEventPublisher publisher,
    IOptions<RabbitMqOptions> rabbitMqOptions) : ICustomerManagementOutboxPublisher
{
    public Task PublishAsync(CustomerManagementOutboxMessage message, CancellationToken cancellationToken)
    {
        using var _ = System.Text.Json.JsonDocument.Parse(message.PayloadJson);

        var integrationMessage = new IntegrationMessage(
            new IntegrationEventMetadata(
                message.Id,
                message.EventName,
                message.EventVersion,
                "crm.customer-management",
                message.OccurredAtUtc.UtcDateTime,
                message.CorrelationId,
                message.CorrelationId),
            message.PayloadJson);

        return publisher.PublishAsync(
            rabbitMqOptions.Value.Exchange,
            message.RoutingKey,
            integrationMessage,
            cancellationToken);
    }
}
