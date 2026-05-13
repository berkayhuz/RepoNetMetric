namespace NetMetric.CRM.ProductCatalog.Contracts.Requests;

public sealed class BulkCatalogItemCreateRequest
{
    public required IReadOnlyCollection<CatalogItemUpsertRequest> Items { get; init; }
}

public sealed class BulkCatalogItemUpdateEntry
{
    public required Guid Id { get; init; }
    public required string Code { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
}

public sealed class BulkCatalogItemUpdateRequest
{
    public required IReadOnlyCollection<BulkCatalogItemUpdateEntry> Items { get; init; }
}

public sealed class BulkCatalogItemIdsRequest
{
    public required IReadOnlyCollection<Guid> Ids { get; init; }
}
