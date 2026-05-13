using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Pipeline.Queries.GetPipelineBoard;

public sealed record GetPipelineBoardQuery(Guid? OwnerUserId, string? Search, int MaxItemsPerStage = 25) : IRequest<IReadOnlyList<PipelineColumnDto>>;
