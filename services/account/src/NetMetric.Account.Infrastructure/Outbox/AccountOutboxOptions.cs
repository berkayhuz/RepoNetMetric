namespace NetMetric.Account.Infrastructure.Outbox;

public sealed class AccountOutboxOptions
{
    public const string SectionName = "Outbox";

    public bool EnableProcessor { get; init; } = true;
    public int PollingIntervalSeconds { get; init; } = 5;
    public int BatchSize { get; init; } = 50;
    public int MaxAttempts { get; init; } = 12;
    public int PoisonDelayMinutes { get; init; } = 60;
}
