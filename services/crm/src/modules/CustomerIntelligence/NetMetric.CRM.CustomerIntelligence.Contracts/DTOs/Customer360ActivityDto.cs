namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed record Customer360ActivityDto(
    Guid Id,
    string SubjectType,
    Guid SubjectId,
    string Name,
    string Category,
    string? Channel,
    string? EntityType,
    Guid? RelatedEntityId,
    string? DataJson,
    DateTime OccurredAtUtc);
