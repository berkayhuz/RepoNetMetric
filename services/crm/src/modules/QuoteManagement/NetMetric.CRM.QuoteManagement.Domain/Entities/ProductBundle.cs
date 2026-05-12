using NetMetric.Entities;

namespace NetMetric.CRM.QuoteManagement.Domain.Entities;

public sealed class ProductBundle : AuditableEntity
{
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Segment { get; set; }
    public string? Industry { get; set; }
    public decimal DiscountRate { get; set; }
    public decimal? MinimumBudget { get; set; }

    public ICollection<ProductBundleItem> Items { get; set; } = new List<ProductBundleItem>();
}
