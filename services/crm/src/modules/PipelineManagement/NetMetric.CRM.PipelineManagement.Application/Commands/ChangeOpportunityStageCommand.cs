using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public sealed record ChangeOpportunityStageCommand(
    Guid OpportunityId,
    OpportunityStageType NewStage,
    Guid? NewPipelineStageId,
    string? Note,
    Guid? LostReasonId,
    string? LostNote,
    string? RowVersion) : IRequest<OpportunityStageTransitionResultDto>;
