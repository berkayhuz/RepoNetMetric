using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record MarkOpportunityWonCommand(Guid OpportunityId, string? DealName, DateTime ClosedDate, string? RowVersion) : IRequest<Guid?>;
