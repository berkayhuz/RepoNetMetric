namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public sealed record LeadConversionPreviewDto(Guid LeadId, string LeadCode, string FullName, string? CompanyName, string? Email, decimal? EstimatedBudget, bool AlreadyConverted, Guid? ConvertedCustomerId);