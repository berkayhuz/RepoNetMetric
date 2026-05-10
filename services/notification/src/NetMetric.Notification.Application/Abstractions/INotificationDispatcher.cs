using NetMetric.Notification.Contracts.Notifications.Requests;
using NetMetric.Notification.Contracts.Notifications.Responses;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationDispatcher
{
    Task<SendNotificationResponse> SendAsync(
        SendNotificationRequest request,
        CancellationToken cancellationToken = default);
}
