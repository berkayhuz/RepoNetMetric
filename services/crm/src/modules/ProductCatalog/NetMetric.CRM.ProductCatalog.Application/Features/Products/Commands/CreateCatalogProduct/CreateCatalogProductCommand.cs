using MediatR;
using NetMetric.CRM.ProductCatalog.Contracts.DTOs;

namespace NetMetric.CRM.ProductCatalog.Application.Features.Products.Commands.CreateCatalogProduct;

public sealed record CreateCatalogProductCommand(
    string Code,
    string Name,
    string? Description) : IRequest<ProductCatalogSummaryDto>;
