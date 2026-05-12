using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Contracts.Requests;

public sealed record ChangeOpportunityStageRequest(
    OpportunityStageType NewStage,
    Guid? NewPipelineStageId,
    string? Note,
    Guid? LostReasonId,
    string? LostNote,
    string? RowVersion);
