using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Domain.Entities;

namespace NetMetric.Notification.Infrastructure.Queues;

public sealed record NotificationQueueMessage(
    Guid Id,
    Guid? TenantId,
    Guid? UserId,
    NotificationCategory Category,
    NotificationPriority Priority,
    string Subject,
    string TextBody,
    string? HtmlBody,
    string? TemplateKey,
    string ChannelsJson,
    string? RecipientEmailAddress,
    string? RecipientPhoneNumber,
    string? RecipientPushToken,
    string? RecipientDisplayName,
    string MetadataJson,
    string? CorrelationId,
    string? IdempotencyKey,
    DateTime CreatedAtUtc)
{
    public static NotificationQueueMessage From(NotificationMessage message) =>
        new(
            message.Id,
            message.TenantId,
            message.UserId,
            message.Category,
            message.Priority,
            message.Subject,
            message.TextBody,
            message.HtmlBody,
            message.TemplateKey,
            message.ChannelsJson,
            message.RecipientEmailAddress,
            message.RecipientPhoneNumber,
            message.RecipientPushToken,
            message.RecipientDisplayName,
            message.MetadataJson,
            message.CorrelationId,
            message.IdempotencyKey,
            message.CreatedAtUtc);

    public NotificationMessage ToDomainMessage() =>
        new(
            Id,
            TenantId,
            UserId,
            Category,
            Priority,
            Subject,
            TextBody,
            HtmlBody,
            TemplateKey,
            ChannelsJson,
            RecipientEmailAddress,
            RecipientPhoneNumber,
            RecipientPushToken,
            RecipientDisplayName,
            MetadataJson,
            CorrelationId,
            IdempotencyKey,
            CreatedAtUtc);
}
