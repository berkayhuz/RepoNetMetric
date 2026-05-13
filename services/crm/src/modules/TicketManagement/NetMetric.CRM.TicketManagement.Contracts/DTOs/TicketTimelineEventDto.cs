namespace NetMetric.CRM.TicketManagement.Contracts.DTOs;

public sealed record TicketTimelineEventDto(
    string EventType,
    DateTime OccurredAt,
    string Title,
    string? Description);
