namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record ProductBundleDto(
    Guid Id,
    string Code,
    string Name,
    string? Description,
    string? Segment,
    string? Industry,
    decimal DiscountRate,
    decimal? MinimumBudget,
    IReadOnlyList<ProductBundleItemDto> Items,
    bool IsActive,
    string RowVersion);
