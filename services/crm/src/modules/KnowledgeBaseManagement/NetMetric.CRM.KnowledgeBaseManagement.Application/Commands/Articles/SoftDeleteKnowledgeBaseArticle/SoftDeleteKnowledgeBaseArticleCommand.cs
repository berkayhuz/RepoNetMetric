using MediatR;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.SoftDeleteKnowledgeBaseArticle;

public sealed record SoftDeleteKnowledgeBaseArticleCommand(Guid ArticleId) : IRequest;
