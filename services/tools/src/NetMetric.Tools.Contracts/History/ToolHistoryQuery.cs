namespace NetMetric.Tools.Contracts.History;

public sealed record ToolHistoryQuery(int Page = 1, int PageSize = 20, string? ToolSlug = null);
