using MediatR;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.PublishKnowledgeBaseArticle;

public sealed record PublishKnowledgeBaseArticleCommand(Guid ArticleId) : IRequest;
