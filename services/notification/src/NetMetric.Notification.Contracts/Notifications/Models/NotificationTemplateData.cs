namespace NetMetric.Notification.Contracts.Notifications.Models;

public sealed record NotificationTemplateData(
    string? TemplateKey,
    IReadOnlyDictionary<string, string> Values);
