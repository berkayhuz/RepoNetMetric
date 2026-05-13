namespace NetMetric.Notification.Domain.Enums;

public enum NotificationStatus
{
    Pending = 1,
    Queued = 2,
    Processing = 3,
    PartiallyDelivered = 4,
    Delivered = 5,
    Failed = 6,
    DeadLettered = 7
}
