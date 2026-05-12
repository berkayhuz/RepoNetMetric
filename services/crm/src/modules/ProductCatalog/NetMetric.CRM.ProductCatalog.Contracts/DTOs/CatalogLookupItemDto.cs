namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class CatalogLookupItemDto
{
    public required Guid Id { get; init; }
    public required string Code { get; init; }
    public required string Name { get; init; }
}
