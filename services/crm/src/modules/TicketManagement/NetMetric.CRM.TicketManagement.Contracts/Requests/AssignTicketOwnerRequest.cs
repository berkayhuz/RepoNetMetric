namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class AssignTicketOwnerRequest
{
    public Guid? OwnerUserId { get; set; }
}
