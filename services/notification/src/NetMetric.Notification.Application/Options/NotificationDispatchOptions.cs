using System.ComponentModel.DataAnnotations;

namespace NetMetric.Notification.Application.Options;

public sealed class NotificationDispatchOptions
{
    public const string SectionName = "Notification:Dispatch";

    [Range(1, 10)]
    public int MaxAttempts { get; init; } = 3;

    [Range(0, 300)]
    public int RetryDelayMilliseconds { get; init; } = 250;

    [Range(0, 86_400)]
    public int MaxRetryDelaySeconds { get; init; } = 30;
}
