namespace NetMetric.Notification.Infrastructure.Options;

public sealed class NotificationDatabaseOptions
{
    public const string SectionName = "Notification:Database";

    public bool ApplyMigrationsOnStartup { get; init; }
}
