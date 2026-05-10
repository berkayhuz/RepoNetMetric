using NetMetric.Notification.Contracts.Notifications.Requests;

namespace NetMetric.Notification.Application.Abstractions;

public interface INotificationTemplateRenderer
{
    SendNotificationRequest Render(SendNotificationRequest request);
}
