namespace NetMetric.Tools.Contracts.History;

public sealed record CreateToolRunResponse(
    Guid RunId,
    Guid ArtifactId,
    DateTimeOffset CreatedAtUtc);
