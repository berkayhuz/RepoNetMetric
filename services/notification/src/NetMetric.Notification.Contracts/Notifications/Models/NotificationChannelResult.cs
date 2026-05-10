using NetMetric.Notification.Contracts.Notifications.Enums;

namespace NetMetric.Notification.Contracts.Notifications.Models;

public sealed record NotificationChannelResult(
    NotificationChannel Channel,
    bool Succeeded,
    string? Provider,
    string? ExternalMessageId,
    string? ErrorCode,
    string? ErrorMessage,
    int AttemptCount);
