namespace NetMetric.Auth.Application.Options;

public sealed class DataRetentionOptions
{
    public const string SectionName = "DataRetention";

    public bool EnableCleanupService { get; set; }

    public int CleanupIntervalMinutes { get; set; } = 60;

    public int AuditRetentionDays { get; set; } = 90;

    public int RevokedSessionRetentionDays { get; set; } = 30;
}
