using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record MarkOpportunityLostCommand(Guid OpportunityId, Guid? LostReasonId, string? LostNote, string? RowVersion) : IRequest;
