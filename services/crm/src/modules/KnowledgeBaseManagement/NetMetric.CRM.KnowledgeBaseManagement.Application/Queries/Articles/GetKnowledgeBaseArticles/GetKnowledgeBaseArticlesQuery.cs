using MediatR;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Queries.Articles.GetKnowledgeBaseArticles;

public sealed record GetKnowledgeBaseArticlesQuery(string? Search, Guid? CategoryId, bool? PublishedOnly, int Page, int PageSize) : IRequest<PagedResult<KnowledgeBaseArticleListItemDto>>;
