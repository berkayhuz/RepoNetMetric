namespace NetMetric.Auth.Application.Options;

public sealed class OutboxOptions
{
    public const string SectionName = "Outbox";

    public bool EnablePublisher { get; set; } = true;
    public int PollingIntervalSeconds { get; set; } = 5;
    public int BatchSize { get; set; } = 50;
    public int MaxAttempts { get; set; } = 12;
    public int LockSeconds { get; set; } = 60;
}
