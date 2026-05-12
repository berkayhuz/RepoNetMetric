namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityProductDto(Guid Id, Guid ProductId, int Quantity, decimal UnitPrice, decimal DiscountRate, decimal VatRate);