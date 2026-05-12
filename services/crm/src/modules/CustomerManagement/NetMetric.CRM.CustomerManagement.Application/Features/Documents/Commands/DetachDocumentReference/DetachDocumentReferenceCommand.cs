using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Documents.Commands.DetachDocumentReference;

public sealed class DetachDocumentReferenceCommand : IRequest<Unit>
{
    public Guid DocumentId { get; init; }
}
