namespace NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

public sealed record KnowledgeBaseCategoryDto(Guid Id, string Name, string Slug, string? Description, int SortOrder);
