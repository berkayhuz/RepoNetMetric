using NetMetric.Notification.Domain.Entities;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationProcessor
{
    Task ProcessAsync(
        NotificationMessage message,
        CancellationToken cancellationToken = default);
}
