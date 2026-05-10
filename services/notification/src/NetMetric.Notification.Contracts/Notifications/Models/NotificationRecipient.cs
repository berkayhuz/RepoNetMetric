namespace NetMetric.Notification.Contracts.Notifications.Models;

public sealed record NotificationRecipient(
    Guid? UserId,
    string? EmailAddress,
    string? PhoneNumber,
    string? PushToken,
    string? DisplayName);
