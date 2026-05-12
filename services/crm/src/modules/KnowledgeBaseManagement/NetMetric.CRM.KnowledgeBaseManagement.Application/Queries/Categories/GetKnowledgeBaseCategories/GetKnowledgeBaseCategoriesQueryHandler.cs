using NetMetric.CRM.KnowledgeBaseManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.KnowledgeBaseManagement.Contracts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Queries.Categories.GetKnowledgeBaseCategories;

public sealed class GetKnowledgeBaseCategoriesQueryHandler(IKnowledgeBaseManagementDbContext dbContext) : IRequestHandler<GetKnowledgeBaseCategoriesQuery, IReadOnlyList<KnowledgeBaseCategoryDto>>
{
    public async Task<IReadOnlyList<KnowledgeBaseCategoryDto>> Handle(GetKnowledgeBaseCategoriesQuery request, CancellationToken cancellationToken)
        => await dbContext.Categories.OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new KnowledgeBaseCategoryDto(x.Id, x.Name, x.Slug, x.Description, x.SortOrder))
            .ToListAsync(cancellationToken);
}
