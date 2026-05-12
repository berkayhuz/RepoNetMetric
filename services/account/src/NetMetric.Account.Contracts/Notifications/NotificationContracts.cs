namespace NetMetric.Account.Contracts.Notifications;

public sealed record AccountNotificationResponse(
    Guid Id,
    string Title,
    string Description,
    string Category,
    string Severity,
    DateTimeOffset OccurredAt,
    bool IsRead);

public sealed record AccountNotificationsResponse(
    IReadOnlyCollection<AccountNotificationResponse> Items,
    int TotalCount,
    int UnreadCount,
    int ReadCount);
