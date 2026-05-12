namespace NetMetric.CRM.DocumentManagement.Contracts.DTOs;

public sealed class DocumentMetadataDto
{
    public required Guid DocumentId { get; init; }
    public required string Name { get; init; }
    public required string ContentType { get; init; }
    public required int VersionCount { get; init; }
    public required string? PreviewUrl { get; init; }
}
