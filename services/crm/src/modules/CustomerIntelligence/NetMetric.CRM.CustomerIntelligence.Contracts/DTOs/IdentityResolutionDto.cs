namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed record IdentityResolutionDto(
    Guid Id,
    string SubjectType,
    Guid SubjectId,
    string IdentityType,
    string IdentityValue,
    decimal ConfidenceScore,
    string? ResolutionNotes,
    DateTime LastResolvedAtUtc);
