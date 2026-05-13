namespace NetMetric.CRM.LeadManagement.Contracts.DTOs;

public sealed record LeadScoreDto(
    Guid Id,
    decimal Score,
    string? ScoreReason,
    DateTime CalculatedAt);
