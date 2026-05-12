namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record WinLossReviewDto(Guid Id, Guid DealId, string Outcome, string? Summary, string? Strengths, string? Risks, string? CompetitorName, decimal? CompetitorPrice, string? CustomerFeedback, DateTime? ReviewedAt, Guid? ReviewedByUserId, string? RowVersion);