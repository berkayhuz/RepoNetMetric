namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class ProductRuleUpsertRequest
{
    public string Name { get; set; } = null!;
    public string RuleType { get; set; } = null!;
    public Guid? TriggerProductId { get; set; }
    public Guid? TargetProductId { get; set; }
    public int? MinimumQuantity { get; set; }
    public decimal? MaximumDiscountRate { get; set; }
    public string Severity { get; set; } = "Error";
    public string Message { get; set; } = null!;
    public string? CriteriaJson { get; set; }
    public string? RowVersion { get; set; }
}
