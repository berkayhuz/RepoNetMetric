namespace NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

public sealed class MarkResolvedRequest
{
    public Guid TicketId { get; init; }
    public DateTime ResolvedAtUtc { get; init; }
}
