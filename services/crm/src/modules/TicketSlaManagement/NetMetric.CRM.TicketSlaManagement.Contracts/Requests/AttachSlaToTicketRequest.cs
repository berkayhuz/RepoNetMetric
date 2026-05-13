namespace NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

public sealed class AttachSlaToTicketRequest
{
    public Guid TicketId { get; init; }
    public Guid SlaPolicyId { get; init; }
    public DateTime CreatedAtUtc { get; init; }
}
