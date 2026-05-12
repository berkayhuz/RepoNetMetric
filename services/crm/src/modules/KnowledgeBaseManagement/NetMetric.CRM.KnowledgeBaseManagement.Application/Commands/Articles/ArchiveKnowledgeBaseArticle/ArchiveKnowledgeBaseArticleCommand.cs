using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.ArchiveKnowledgeBaseArticle;

public sealed record ArchiveKnowledgeBaseArticleCommand(Guid ArticleId) : IRequest;
