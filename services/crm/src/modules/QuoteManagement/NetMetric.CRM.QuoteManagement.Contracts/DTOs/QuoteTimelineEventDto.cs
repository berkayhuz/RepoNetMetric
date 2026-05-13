namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record QuoteTimelineEventDto(DateTime OccurredAt, string EventType, string Title, string? Description);
