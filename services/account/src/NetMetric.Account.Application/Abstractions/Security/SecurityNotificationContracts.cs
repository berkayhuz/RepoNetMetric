namespace NetMetric.Account.Application.Abstractions.Security;

public sealed record SecurityNotificationRequest(
    Guid TenantId,
    Guid UserId,
    string NotificationType,
    string? IpAddress,
    string? UserAgent,
    DateTimeOffset OccurredAt);

public interface ISecurityNotificationPublisher
{
    Task PublishAsync(SecurityNotificationRequest request, CancellationToken cancellationToken = default);
}
