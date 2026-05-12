namespace NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

public sealed class TicketStatusHistoryDto
{
    public Guid Id { get; init; }
    public Guid TicketId { get; init; }
    public string PreviousStatus { get; init; } = null!;
    public string NewStatus { get; init; } = null!;
    public Guid? ChangedByUserId { get; init; }
    public string? Note { get; init; }
    public DateTime ChangedAtUtc { get; init; }
}
