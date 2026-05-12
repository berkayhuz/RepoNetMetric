namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Timeline;

public sealed class TimelineEventDto
{
    public required string EventType { get; init; }
    public required string Title { get; init; }
    public string? Description { get; init; }
    public DateTime OccurredAt { get; init; }
    public string? Actor { get; init; }
    public Guid? ReferenceId { get; init; }
}
