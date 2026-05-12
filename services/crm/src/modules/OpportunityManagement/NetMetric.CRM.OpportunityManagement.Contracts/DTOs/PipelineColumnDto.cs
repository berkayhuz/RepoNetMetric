using NetMetric.CRM.Types;

namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record PipelineColumnDto(OpportunityStageType Stage, int Count, decimal TotalEstimatedAmount, IReadOnlyList<OpportunityListItemDto> Items);
