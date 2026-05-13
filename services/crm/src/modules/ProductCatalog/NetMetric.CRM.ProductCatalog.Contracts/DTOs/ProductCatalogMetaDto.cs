namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class ProductCatalogMetaDto
{
    public required string Module { get; init; }
    public required string Version { get; init; }
    public required IReadOnlyList<string> Resources { get; init; }
    public required IReadOnlyList<string> Features { get; init; }
}
