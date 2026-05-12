using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Bulk.Commands.BulkAssignOpportunitiesOwner;

public sealed record BulkAssignOpportunitiesOwnerCommand(IReadOnlyCollection<Guid> OpportunityIds, Guid? OwnerUserId) : IRequest<int>;
