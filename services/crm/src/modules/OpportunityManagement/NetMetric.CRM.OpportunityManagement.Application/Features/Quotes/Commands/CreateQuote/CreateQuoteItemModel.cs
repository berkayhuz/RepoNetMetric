namespace NetMetric.CRM.OpportunityManagement.Application.Features.Quotes.Commands.CreateQuote;

public sealed record CreateQuoteItemModel(Guid ProductId, string? Description, int Quantity, decimal UnitPrice, decimal DiscountRate, decimal TaxRate);
