namespace NetMetric.CRM.QuoteManagement.Application.Common;

public sealed record ProductBundleLineInput(Guid ProductId, int Quantity, bool IsOptional);
