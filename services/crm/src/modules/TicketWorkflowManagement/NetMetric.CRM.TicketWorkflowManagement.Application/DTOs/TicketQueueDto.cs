namespace NetMetric.CRM.TicketWorkflowManagement.Application.DTOs;

public sealed class TicketQueueDto
{
    public Guid Id { get; init; }
    public string Code { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string? Description { get; init; }
    public string AssignmentStrategy { get; init; } = null!;
    public bool IsDefault { get; init; }
}
