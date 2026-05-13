namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class CatalogBulkOperationResultDto
{
    public required int RequestedCount { get; init; }
    public required int ProcessedCount { get; init; }
}
