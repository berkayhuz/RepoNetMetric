namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed record BehavioralEventDto(
    Guid Id,
    string Source,
    string EventName,
    string SubjectType,
    Guid SubjectId,
    string? IdentityKey,
    string? Channel,
    string? PropertiesJson,
    DateTime OccurredAtUtc);
