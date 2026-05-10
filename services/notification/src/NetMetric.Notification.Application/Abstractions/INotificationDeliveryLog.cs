using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Models;
using NetMetric.Notification.Contracts.Notifications.Requests;
using NetMetric.Notification.Domain.Entities;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationDeliveryLog
{
    Task<NotificationMessage> CreateNotificationAsync(
        SendNotificationRequest request,
        CancellationToken cancellationToken);

    Task<NotificationMessage?> GetNotificationAsync(
        Guid notificationId,
        CancellationToken cancellationToken);

    Task<IReadOnlySet<NotificationChannel>> GetSucceededChannelsAsync(
        Guid notificationId,
        CancellationToken cancellationToken);

    Task MarkQueuedAsync(
        Guid notificationId,
        CancellationToken cancellationToken);

    Task MarkProcessingAsync(
        Guid notificationId,
        CancellationToken cancellationToken);

    Task MarkDeadLetteredAsync(
        Guid notificationId,
        string reason,
        CancellationToken cancellationToken);

    Task RecordAttemptAsync(
        Guid notificationId,
        NotificationChannelResult result,
        string? recipient,
        CancellationToken cancellationToken);
}
