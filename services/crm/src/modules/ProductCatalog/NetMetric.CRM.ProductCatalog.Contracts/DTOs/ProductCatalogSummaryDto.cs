namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class ProductCatalogSummaryDto
{
    public required Guid Id { get; init; }
    public required string Code { get; init; }
    public required string Name { get; init; }
    public string? Description { get; init; }
    public required bool IsActive { get; init; }
    public string? PrimaryImageUrl { get; init; }
}
