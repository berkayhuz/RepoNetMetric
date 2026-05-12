using NetMetric.CRM.CustomerManagement.Application.DTOs.Documents;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Documents.Commands.AttachDocumentReference;

public sealed class AttachDocumentReferenceCommand : IRequest<DocumentReferenceDto>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
    public required string FileName { get; init; }
    public required string OriginalFileName { get; init; }
    public required string FileExtension { get; init; }
    public required string ContentType { get; init; }
    public required string PathOrUrl { get; init; }
    public long FileSize { get; init; }
    public bool IsPrivate { get; init; } = true;
}
