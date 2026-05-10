using NetMetric.Notification.Contracts.Notifications.Models;

namespace NetMetric.Notification.Contracts.Notifications.Responses;

public sealed record SendNotificationResponse(
    Guid NotificationId,
    bool Accepted,
    IReadOnlyCollection<NotificationChannelResult> ChannelResults);
