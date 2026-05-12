using NetMetric.Account.Application.Abstractions.Security;
using NetMetric.Account.Application.Abstractions.Outbox;
using NetMetric.Account.Infrastructure.Outbox;

namespace NetMetric.Account.Infrastructure.Security;

public sealed class NoopSecurityNotificationPublisher(IAccountOutboxWriter outboxWriter) : ISecurityNotificationPublisher
{
    public Task PublishAsync(SecurityNotificationRequest request, CancellationToken cancellationToken = default)
        => outboxWriter.EnqueueAsync(
            request.TenantId,
            OutboxEventTypes.SecurityNotificationRequested,
            request,
            correlationId: null,
            cancellationToken);
}
