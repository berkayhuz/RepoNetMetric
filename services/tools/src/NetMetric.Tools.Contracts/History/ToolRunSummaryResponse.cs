namespace NetMetric.Tools.Contracts.History;

public sealed record ToolRunSummaryResponse(
    Guid RunId,
    string ToolSlug,
    DateTimeOffset CreatedAtUtc,
    int ArtifactCount);
