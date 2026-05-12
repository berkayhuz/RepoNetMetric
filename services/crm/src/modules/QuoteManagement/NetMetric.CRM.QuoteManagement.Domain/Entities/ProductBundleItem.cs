using NetMetric.Entities;

namespace NetMetric.CRM.QuoteManagement.Domain.Entities;

public sealed class ProductBundleItem : AuditableEntity
{
    public Guid ProductBundleId { get; set; }
    public ProductBundle ProductBundle { get; set; } = null!;
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public bool IsOptional { get; set; }
}
