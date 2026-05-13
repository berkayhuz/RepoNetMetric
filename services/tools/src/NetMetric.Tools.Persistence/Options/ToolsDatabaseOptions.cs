namespace NetMetric.Tools.Persistence.Options;

public sealed class ToolsDatabaseOptions
{
    public const string SectionName = "Tools:Database";
    public int CommandTimeoutSeconds { get; init; } = 30;
    public int MaxRetryCount { get; init; } = 3;
}
