using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.UpdateKnowledgeBaseArticle;

public sealed record UpdateKnowledgeBaseArticleCommand(Guid ArticleId, Guid CategoryId, string Title, string? Summary, string Content, bool IsPublic) : IRequest<KnowledgeBaseArticleDetailDto>;
