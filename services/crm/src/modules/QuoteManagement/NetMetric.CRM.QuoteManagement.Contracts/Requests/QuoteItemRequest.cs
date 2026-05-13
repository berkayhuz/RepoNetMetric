namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class QuoteItemRequest
{
    public Guid ProductId { get; set; }
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal DiscountRate { get; set; }
    public decimal TaxRate { get; set; }
}
