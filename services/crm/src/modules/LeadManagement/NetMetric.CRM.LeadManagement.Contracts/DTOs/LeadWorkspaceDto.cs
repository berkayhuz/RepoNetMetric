namespace NetMetric.CRM.LeadManagement.Contracts.DTOs;

public sealed record LeadWorkspaceDto(
    LeadDetailDto Lead,
    int ScoreHistoryCount,
    decimal? LatestScore,
    int RelatedOpenOpportunityCount);
