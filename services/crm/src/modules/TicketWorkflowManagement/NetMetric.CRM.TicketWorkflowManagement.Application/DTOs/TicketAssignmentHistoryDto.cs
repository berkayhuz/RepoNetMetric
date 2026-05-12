namespace NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

public sealed class TicketAssignmentHistoryDto
{
    public Guid Id { get; init; }
    public Guid TicketId { get; init; }
    public Guid? PreviousOwnerUserId { get; init; }
    public Guid? NewOwnerUserId { get; init; }
    public Guid? PreviousQueueId { get; init; }
    public Guid? NewQueueId { get; init; }
    public Guid? ChangedByUserId { get; init; }
    public string? Reason { get; init; }
    public DateTime ChangedAtUtc { get; init; }
}
