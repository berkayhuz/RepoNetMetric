namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public sealed record LostReasonDto(Guid Id, string Name, string? Description, bool IsDefault, string? RowVersion);