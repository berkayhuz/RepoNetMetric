namespace NetMetric.CRM.LeadManagement.Contracts.DTOs;

public sealed record LeadTimelineEventDto(
    DateTime OccurredAt,
    string EventType,
    string Title,
    string? Description);
