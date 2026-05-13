namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class ProductCatalogLookupsDto
{
    public required IReadOnlyList<CatalogLookupItemDto> Products { get; init; }
    public required IReadOnlyList<CatalogLookupItemDto> Categories { get; init; }
    public required IReadOnlyList<CatalogLookupItemDto> PriceLists { get; init; }
    public required IReadOnlyList<CatalogLookupItemDto> DiscountMatrices { get; init; }
    public required IReadOnlyList<CatalogLookupItemDto> ProductBindings { get; init; }
}
