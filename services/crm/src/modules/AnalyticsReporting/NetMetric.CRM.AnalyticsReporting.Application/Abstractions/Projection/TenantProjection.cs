namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record TenantProjection(
    Guid TenantId,
    string TenantName,
    int ActiveUsers,
    int Customers,
    decimal Revenue,
    int OpenTickets);
