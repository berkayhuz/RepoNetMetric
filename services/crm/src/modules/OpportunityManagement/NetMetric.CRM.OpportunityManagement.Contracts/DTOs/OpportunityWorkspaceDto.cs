namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityWorkspaceDto(OpportunityDetailDto Opportunity, decimal? TotalQuoteAmount, int QuoteCount, int ActivityCount, int StageChangeCount);
