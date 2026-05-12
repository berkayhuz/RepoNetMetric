namespace NetMetric.CRM.LeadManagement.Contracts.Requests;

public sealed class UpsertLeadScoreRequest
{
    public decimal Score { get; set; }
    public string? ScoreReason { get; set; }
}
