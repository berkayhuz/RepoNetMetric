namespace NetMetric.CRM.ProductCatalog.Contracts.Requests;

public sealed class CatalogItemUpsertRequest
{
    public required string Code { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
}
