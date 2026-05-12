using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed record CreateOpportunityCommand(string OpportunityCode, string Name, string? Description, decimal EstimatedAmount, decimal? ExpectedRevenue, decimal Probability, DateTime? EstimatedCloseDate, OpportunityStageType Stage, OpportunityStatusType Status, PriorityType Priority, Guid? LeadId, Guid? CustomerId, Guid? OwnerUserId, string? Notes) : IRequest<OpportunityDetailDto>;
