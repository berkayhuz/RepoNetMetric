using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record AddOpportunityContactCommand(Guid OpportunityId, Guid ContactId, bool IsDecisionMaker, bool IsPrimary) : IRequest<OpportunityContactDto>;
