namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Documents;

public sealed class DocumentReferenceDto
{
    public required Guid Id { get; init; }
    public required string FileName { get; init; }
    public required string OriginalFileName { get; init; }
    public required string ContentType { get; init; }
    public string? FileExtension { get; init; }
    public string? PathOrUrl { get; init; }
    public long FileSize { get; init; }
    public bool IsPrivate { get; init; }
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
    public DateTime CreatedAt { get; init; }
}
