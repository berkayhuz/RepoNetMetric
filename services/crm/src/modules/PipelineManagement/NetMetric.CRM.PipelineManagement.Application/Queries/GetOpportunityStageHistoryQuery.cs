using NetMetric.CRM.PipelineManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.PipelineManagement.Application.Queries;

public sealed record GetOpportunityStageHistoryQuery(Guid OpportunityId) : IRequest<IReadOnlyList<OpportunityStageHistoryDto>>;