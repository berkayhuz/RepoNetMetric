using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityStageHistoryDto(Guid Id, OpportunityStageType OldStage, OpportunityStageType NewStage, DateTime ChangedAt, Guid? ChangedByUserId, string? Note);
