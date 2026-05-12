namespace NetMetric.CRM.Support;

public class TicketPriorityHistory : AuditableEntity
{
    public Guid TicketId { get; set; }
    public Ticket? Ticket { get; set; }
    public PriorityType OldPriority { get; set; }
    public PriorityType NewPriority { get; set; }
    public string? Note { get; set; }
    public DateTime OccurredAt { get; set; }
    public DateTime ChangedAt { get; set; }
    public Guid? ChangedByUserId { get; set; }
}
