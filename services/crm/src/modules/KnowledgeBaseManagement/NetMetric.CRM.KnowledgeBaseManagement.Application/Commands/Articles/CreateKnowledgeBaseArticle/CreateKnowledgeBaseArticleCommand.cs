using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.CreateKnowledgeBaseArticle;

public sealed record CreateKnowledgeBaseArticleCommand(Guid CategoryId, string Title, string? Summary, string Content, bool IsPublic) : IRequest<KnowledgeBaseArticleDetailDto>;
