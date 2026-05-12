using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Commands.Articles.SoftDeleteKnowledgeBaseArticle;

public sealed record SoftDeleteKnowledgeBaseArticleCommand(Guid ArticleId) : IRequest;
