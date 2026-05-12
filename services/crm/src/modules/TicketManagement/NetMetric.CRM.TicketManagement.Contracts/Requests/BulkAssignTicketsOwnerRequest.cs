namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class BulkAssignTicketsOwnerRequest
{
    public IReadOnlyCollection<Guid> TicketIds { get; set; } = [];
    public Guid? OwnerUserId { get; set; }
}
