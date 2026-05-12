namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record RevenueAgingProjection(
    Guid TenantId,
    decimal CurrentAmount,
    decimal Days30,
    decimal Days60,
    decimal Days90Plus);

