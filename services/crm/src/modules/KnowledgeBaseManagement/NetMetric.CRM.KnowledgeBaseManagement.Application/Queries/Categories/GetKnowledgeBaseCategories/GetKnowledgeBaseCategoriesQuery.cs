using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Queries.Categories.GetKnowledgeBaseCategories;

public sealed record GetKnowledgeBaseCategoriesQuery() : IRequest<IReadOnlyList<KnowledgeBaseCategoryDto>>;
