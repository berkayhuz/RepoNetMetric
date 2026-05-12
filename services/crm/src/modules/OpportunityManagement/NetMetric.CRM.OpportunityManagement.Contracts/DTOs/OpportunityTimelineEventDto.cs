namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityTimelineEventDto(DateTime OccurredAt, string EventType, string Title, string? Description);