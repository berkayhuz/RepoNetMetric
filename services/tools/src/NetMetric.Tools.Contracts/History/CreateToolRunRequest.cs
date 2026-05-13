namespace NetMetric.Tools.Contracts.History;

public sealed record CreateToolRunRequest(
    string ToolSlug,
    string InputSummaryJson,
    string ArtifactFileName,
    string ArtifactMimeType);
