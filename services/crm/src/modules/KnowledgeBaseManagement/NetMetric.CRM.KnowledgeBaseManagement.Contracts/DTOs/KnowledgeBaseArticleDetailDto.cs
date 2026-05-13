namespace NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

public sealed record KnowledgeBaseArticleDetailDto(Guid Id, Guid CategoryId, string CategoryName, string Title, string Slug, string? Summary, string Content, string Status, bool IsPublic, DateTime? PublishedAt);
