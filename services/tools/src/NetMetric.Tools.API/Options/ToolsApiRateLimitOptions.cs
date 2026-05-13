namespace NetMetric.Tools.API.Options;

public sealed class ToolsApiRateLimitOptions
{
    public const string SectionName = "Tools:RateLimiting";
    public int HistoryWritePermitLimit { get; init; } = 20;
    public int HistoryWriteWindowSeconds { get; init; } = 60;
}
