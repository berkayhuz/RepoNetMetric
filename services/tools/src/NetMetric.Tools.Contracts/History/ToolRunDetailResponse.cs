namespace NetMetric.Tools.Contracts.History;

public sealed record ToolRunDetailResponse(
    Guid RunId,
    string ToolSlug,
    string InputSummaryJson,
    DateTimeOffset CreatedAtUtc,
    IReadOnlyCollection<ToolArtifactResponse> Artifacts);
