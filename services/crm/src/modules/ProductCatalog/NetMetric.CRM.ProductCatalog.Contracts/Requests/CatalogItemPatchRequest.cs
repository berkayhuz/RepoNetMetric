namespace NetMetric.CRM.ProductCatalog.Contracts.Requests;

public sealed class CatalogItemPatchRequest
{
    public string? Code { get; init; }
    public string? Name { get; init; }
    public string? Description { get; init; }
    public bool? IsActive { get; init; }
}
