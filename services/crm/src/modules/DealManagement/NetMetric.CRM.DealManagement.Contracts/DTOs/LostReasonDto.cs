namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record LostReasonDto(Guid Id, string Name, string? Description, bool IsDefault);