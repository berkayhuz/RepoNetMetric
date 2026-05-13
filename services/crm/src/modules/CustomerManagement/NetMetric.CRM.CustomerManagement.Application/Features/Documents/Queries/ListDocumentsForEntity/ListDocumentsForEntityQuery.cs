using MediatR;
using NetMetric.CRM.CustomerManagement.Application.DTOs.Documents;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Documents.Queries.ListDocumentsForEntity;

public sealed class ListDocumentsForEntityQuery : IRequest<IReadOnlyList<DocumentReferenceDto>>
{
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
}
