using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Requests;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationChannelSender
{
    NotificationChannel Channel { get; }
    string ProviderName { get; }

    Task<NotificationChannelSendResult> SendAsync(
        SendNotificationRequest request,
        CancellationToken cancellationToken);
}
