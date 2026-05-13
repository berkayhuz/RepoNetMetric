using MediatR;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Queries.Articles.GetKnowledgeBaseArticleBySlug;

public sealed record GetKnowledgeBaseArticleBySlugQuery(string Slug) : IRequest<KnowledgeBaseArticleDetailDto?>;
