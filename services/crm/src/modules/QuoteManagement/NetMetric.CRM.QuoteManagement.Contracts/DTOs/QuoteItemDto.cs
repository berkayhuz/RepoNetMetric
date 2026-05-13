namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record QuoteItemDto(Guid Id, Guid ProductId, string? Description, int Quantity, decimal UnitPrice, decimal DiscountRate, decimal TaxRate, decimal LineTotal);
