using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Tags.Commands.DeleteTag;

public sealed class DeleteTagCommand : IRequest<Unit>
{
    public Guid TagId { get; init; }
}
