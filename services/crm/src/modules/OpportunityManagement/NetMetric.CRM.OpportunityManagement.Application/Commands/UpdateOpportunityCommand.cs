using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record UpdateOpportunityCommand(Guid OpportunityId, string OpportunityCode, string Name, string? Description, decimal EstimatedAmount, decimal? ExpectedRevenue, decimal Probability, DateTime? EstimatedCloseDate, OpportunityStageType Stage, OpportunityStatusType Status, PriorityType Priority, Guid? LeadId, Guid? CustomerId, Guid? OwnerUserId, string? Notes, string RowVersion) : IRequest<OpportunityDetailDto>;
