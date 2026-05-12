namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class ProductBundleItemRequest
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public bool IsOptional { get; set; }
}
