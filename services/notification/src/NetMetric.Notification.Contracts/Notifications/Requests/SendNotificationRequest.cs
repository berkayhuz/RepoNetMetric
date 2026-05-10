using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Models;

namespace NetMetric.Notification.Contracts.Notifications.Requests;

public sealed record SendNotificationRequest(
    Guid? TenantId,
    NotificationRecipient Recipient,
    IReadOnlyCollection<NotificationChannel> Channels,
    NotificationCategory Category,
    NotificationPriority Priority,
    string Subject,
    string TextBody,
    string? HtmlBody,
    string? TemplateKey,
    IReadOnlyDictionary<string, string> Metadata,
    string? CorrelationId,
    string? IdempotencyKey);
