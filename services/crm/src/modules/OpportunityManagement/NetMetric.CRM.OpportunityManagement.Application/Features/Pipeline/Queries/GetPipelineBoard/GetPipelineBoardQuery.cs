using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Pipeline.Queries.GetPipelineBoard;

public sealed record GetPipelineBoardQuery(Guid? OwnerUserId, string? Search, int MaxItemsPerStage = 25) : IRequest<IReadOnlyList<PipelineColumnDto>>;