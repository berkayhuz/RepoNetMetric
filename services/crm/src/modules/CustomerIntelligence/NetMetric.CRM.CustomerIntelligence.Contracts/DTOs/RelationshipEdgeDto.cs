namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed record RelationshipEdgeDto(
    Guid Id,
    string Name,
    string RelationshipType,
    RelationshipNodeDto Source,
    RelationshipNodeDto Target,
    decimal StrengthScore,
    bool IsBidirectional,
    DateTime OccurredAtUtc,
    string? DataJson);
