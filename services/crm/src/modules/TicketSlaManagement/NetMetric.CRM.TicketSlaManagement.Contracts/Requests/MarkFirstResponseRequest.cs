namespace NetMetric.CRM.TicketSlaManagement.Contracts.Requests;

public sealed class MarkFirstResponseRequest
{
    public Guid TicketId { get; init; }
    public DateTime RespondedAtUtc { get; init; }
}
