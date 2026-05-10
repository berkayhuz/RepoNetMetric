using NetMetric.Notification.Contracts.Notifications.Enums;

namespace NetMetric.Notification.Application.Abstractions;

public interface IUserNotificationPreferenceReader
{
    Task<bool> IsChannelEnabledAsync(
        Guid? tenantId,
        Guid userId,
        NotificationCategory category,
        NotificationChannel channel,
        CancellationToken cancellationToken);
}
