using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record SoftDeleteOpportunityCommand(Guid OpportunityId) : IRequest;