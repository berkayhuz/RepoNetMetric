namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record CpqValidationResultDto(bool IsValid, IReadOnlyList<string> Violations);
