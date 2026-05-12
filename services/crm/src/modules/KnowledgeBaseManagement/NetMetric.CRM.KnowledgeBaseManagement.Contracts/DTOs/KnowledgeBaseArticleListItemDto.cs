namespace NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

public sealed record KnowledgeBaseArticleListItemDto(Guid Id, Guid CategoryId, string CategoryName, string Title, string Slug, string? Summary, string Status, bool IsPublic, DateTime? PublishedAt);
