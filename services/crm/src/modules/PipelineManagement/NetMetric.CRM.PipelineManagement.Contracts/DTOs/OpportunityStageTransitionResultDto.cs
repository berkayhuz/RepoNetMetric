using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public sealed record OpportunityStageTransitionResultDto(Guid OpportunityId, OpportunityStageType PreviousStage, OpportunityStageType CurrentStage, OpportunityStatusType Status, Guid? LostReasonId, string? LostNote, string? RowVersion);
