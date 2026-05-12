namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class TicketCategoryUpsertRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Guid? ParentCategoryId { get; set; }
}
