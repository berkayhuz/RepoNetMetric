using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Requests;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationChannelPolicy
{
    Task<IReadOnlyCollection<NotificationChannel>> ResolveChannelsAsync(
        SendNotificationRequest request,
        CancellationToken cancellationToken);
}
