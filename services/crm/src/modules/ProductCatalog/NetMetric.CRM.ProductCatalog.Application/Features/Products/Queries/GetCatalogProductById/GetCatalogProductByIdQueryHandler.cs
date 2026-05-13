using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.ProductCatalog.Application.Abstractions.Persistence;
using NetMetric.CRM.ProductCatalog.Contracts.DTOs;

namespace NetMetric.CRM.ProductCatalog.Application.Features.Products.Queries.GetCatalogProductById;

public sealed class GetCatalogProductByIdQueryHandler(IProductCatalogDbContext dbContext)
    : IRequestHandler<GetCatalogProductByIdQuery, ProductCatalogSummaryDto?>
{
    public async Task<ProductCatalogSummaryDto?> Handle(GetCatalogProductByIdQuery request, CancellationToken cancellationToken)
    {
        return await dbContext.Products
            .Where(x => x.Id == request.Id)
            .Select(x => new ProductCatalogSummaryDto
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                Description = x.Description,
                IsActive = x.IsActive
            })
            .SingleOrDefaultAsync(cancellationToken);
    }
}
