namespace NetMetric.Tools.Contracts.History;

public sealed record ToolArtifactResponse(
    Guid ArtifactId,
    string MimeType,
    long SizeBytes,
    string FileName,
    string ChecksumSha256,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset? ExpiresAtUtc);
