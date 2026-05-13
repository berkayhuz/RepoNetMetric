namespace NetMetric.Account.Contracts.Notifications;

public sealed record NotificationPreferenceItemResponse(
    Guid Id,
    string Channel,
    string Category,
    bool IsEnabled,
    string Version);

public sealed record NotificationPreferencesResponse(IReadOnlyCollection<NotificationPreferenceItemResponse> Items);

public sealed record UpdateNotificationPreferenceItemRequest(
    string Channel,
    string Category,
    bool IsEnabled);

public sealed record UpdateNotificationPreferencesRequest(
    IReadOnlyCollection<UpdateNotificationPreferenceItemRequest> Items);
