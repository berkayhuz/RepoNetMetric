namespace NetMetric.Tools.Contracts.Jobs;

public enum ToolJobStatus
{
    Queued = 1,
    Running = 2,
    Succeeded = 3,
    Failed = 4,
    Cancelled = 5,
    Expired = 6
}

public sealed record CreateToolJobResponse(Guid JobId, ToolJobStatus Status, DateTimeOffset CreatedAtUtc);
public sealed record ToolJobStatusResponse(Guid JobId, ToolJobStatus Status, int ProgressPercent, Guid? RunId, string? Error, DateTimeOffset UpdatedAtUtc);
