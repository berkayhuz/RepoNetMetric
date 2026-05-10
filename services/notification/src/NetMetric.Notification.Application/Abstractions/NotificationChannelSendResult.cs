namespace NetMetric.Notification.Application.Abstractions;

public sealed record NotificationChannelSendResult(
    bool Succeeded,
    string? ExternalMessageId,
    string? ErrorCode,
    string? ErrorMessage);
