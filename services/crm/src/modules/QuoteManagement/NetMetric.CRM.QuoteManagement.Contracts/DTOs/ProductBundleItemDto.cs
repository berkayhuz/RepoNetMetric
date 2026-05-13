namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record ProductBundleItemDto(Guid ProductId, int Quantity, bool IsOptional);
