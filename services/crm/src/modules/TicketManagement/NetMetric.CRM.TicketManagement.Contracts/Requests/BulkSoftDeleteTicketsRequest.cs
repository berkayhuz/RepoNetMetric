namespace NetMetric.CRM.TicketManagement.Contracts.Requests;

public sealed class BulkSoftDeleteTicketsRequest
{
    public IReadOnlyCollection<Guid> TicketIds { get; set; } = [];
}
