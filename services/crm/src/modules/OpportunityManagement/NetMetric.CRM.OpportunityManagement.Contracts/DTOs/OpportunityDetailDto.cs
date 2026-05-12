using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityDetailDto(
    Guid Id,
    string OpportunityCode,
    string Name,
    string? Description,
    decimal? EstimatedAmount,
    decimal? ExpectedRevenue,
    decimal Probability,
    DateTime? EstimatedCloseDate,
    OpportunityStageType Stage,
    Guid? PipelineId,
    Guid? PipelineStageId,
    OpportunityStatusType Status,
    PriorityType Priority,
    Guid? LeadId,
    Guid? CustomerId,
    Guid? OwnerUserId,
    Guid? LostReasonId,
    string? LostNote,
    string? Notes,
    bool IsActive,
    IReadOnlyList<OpportunityProductDto> Products,
    IReadOnlyList<OpportunityContactDto> Contacts,
    IReadOnlyList<QuoteDetailDto> Quotes,
    IReadOnlyList<OpportunityStageHistoryDto> StageHistory,
    string RowVersion);
