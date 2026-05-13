using NetMetric.Notification.Domain.Entities;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationQueue
{
    Task EnqueueAsync(
        NotificationMessage message,
        CancellationToken cancellationToken = default);

    Task<NotificationMessage?> DequeueAsync(CancellationToken cancellationToken);

    Task CompleteAsync(
        NotificationMessage message,
        CancellationToken cancellationToken = default);

    Task AbandonAsync(
        NotificationMessage message,
        bool requeue,
        CancellationToken cancellationToken = default);
}
