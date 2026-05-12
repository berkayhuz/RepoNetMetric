using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Tags.Commands.AssignTag;

public sealed class AssignTagCommand : IRequest<Guid>
{
    public required Guid TagId { get; init; }
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
}
