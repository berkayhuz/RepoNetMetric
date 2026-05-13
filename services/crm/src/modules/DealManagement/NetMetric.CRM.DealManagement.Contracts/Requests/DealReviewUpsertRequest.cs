namespace NetMetric.CRM.DealManagement.Contracts.Requests;

public sealed record DealReviewUpsertRequest(string Outcome, string? Summary, string? Strengths, string? Risks, string? CompetitorName, decimal? CompetitorPrice, string? CustomerFeedback, string? RowVersion);
