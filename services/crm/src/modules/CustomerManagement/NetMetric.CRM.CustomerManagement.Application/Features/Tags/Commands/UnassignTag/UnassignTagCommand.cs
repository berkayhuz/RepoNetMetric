using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Tags.Commands.UnassignTag;

public sealed class UnassignTagCommand : IRequest<Unit>
{
    public required Guid TagId { get; init; }
    public required string EntityName { get; init; }
    public required Guid EntityId { get; init; }
}
