namespace NetMetric.CRM.Support;

public class TicketCategory : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Guid? ParentCategoryId { get; set; }
    public TicketCategory? ParentCategory { get; set; }
}
