using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public sealed record OpportunityStageHistoryDto(Guid Id, Guid OpportunityId, OpportunityStageType OldStage, OpportunityStageType NewStage, DateTime ChangedAt, Guid? ChangedByUserId, string? Note);
