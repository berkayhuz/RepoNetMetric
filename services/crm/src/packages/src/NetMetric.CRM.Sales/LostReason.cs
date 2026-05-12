namespace NetMetric.CRM.Sales;

public class LostReason : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsDefault { get; set; }
}
