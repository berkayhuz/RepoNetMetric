using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record AssignOpportunityOwnerCommand(Guid OpportunityId, Guid? OwnerUserId) : IRequest;
