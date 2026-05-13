namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationQueueHealthCheck
{
    Task<bool> CanConnectAsync(CancellationToken cancellationToken = default);
}
