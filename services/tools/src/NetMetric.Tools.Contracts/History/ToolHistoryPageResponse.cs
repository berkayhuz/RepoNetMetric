namespace NetMetric.Tools.Contracts.History;

public sealed record ToolHistoryPageResponse(
    int Page,
    int PageSize,
    int TotalCount,
    IReadOnlyCollection<ToolRunSummaryResponse> Items);
