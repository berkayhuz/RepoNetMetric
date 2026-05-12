namespace NetMetric.CRM.Support;

public class TicketStatusHistory : AuditableEntity
{
    public Guid TicketId { get; set; }
    public Ticket? Ticket { get; set; }
    public TicketStatusType OldStatus { get; set; }
    public TicketStatusType NewStatus { get; set; }
    public string? Note { get; set; }
    public DateTime OccurredAt { get; set; }
    public DateTime ChangedAt { get; set; }
    public Guid? ChangedByUserId { get; set; }
}
