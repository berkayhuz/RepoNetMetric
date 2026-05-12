using MediatR;
using NetMetric.CRM.ProductCatalog.Contracts.DTOs;

namespace NetMetric.CRM.ProductCatalog.Application.Features.Products.Queries.GetCatalogProductById;

public sealed record GetCatalogProductByIdQuery(Guid Id) : IRequest<ProductCatalogSummaryDto?>;
