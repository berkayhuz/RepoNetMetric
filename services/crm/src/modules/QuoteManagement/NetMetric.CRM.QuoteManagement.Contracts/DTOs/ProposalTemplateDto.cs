namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record ProposalTemplateDto(Guid Id, string Name, string? SubjectTemplate, string BodyTemplate, bool IsDefault, bool IsActive, string? Notes);
