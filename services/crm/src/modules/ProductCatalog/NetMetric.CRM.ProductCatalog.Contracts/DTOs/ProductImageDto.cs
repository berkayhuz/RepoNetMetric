namespace NetMetric.CRM.ProductCatalog.Contracts.DTOs;

public sealed class ProductImageDto
{
    public required Guid Id { get; init; }
    public required Guid ProductId { get; init; }
    public required Guid MediaAssetId { get; init; }
    public required string PublicUrl { get; init; }
    public int SortOrder { get; init; }
    public bool IsPrimary { get; init; }
    public string? AltText { get; init; }
}
