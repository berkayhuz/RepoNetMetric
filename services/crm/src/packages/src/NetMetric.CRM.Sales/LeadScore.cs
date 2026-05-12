namespace NetMetric.CRM.Sales;

public class LeadScore : AuditableEntity
{
    public Guid LeadId { get; set; }
    public Lead? Lead { get; set; }
    public decimal Score { get; set; }
    public decimal FitScoreDelta { get; set; }
    public decimal EngagementScoreDelta { get; set; }
    public string? ScoreReason { get; set; }
    public string? RuleId { get; set; }
    public DateTime CalculatedAt { get; set; }
}
