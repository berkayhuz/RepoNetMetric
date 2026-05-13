namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class CatalogImportResultDto
{
    public required int RequestedCount { get; init; }
    public required int CreatedCount { get; init; }
    public required int UpdatedCount { get; init; }
    public required int SkippedCount { get; init; }
}
