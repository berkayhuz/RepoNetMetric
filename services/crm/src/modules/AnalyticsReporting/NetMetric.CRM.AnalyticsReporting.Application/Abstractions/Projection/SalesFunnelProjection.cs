namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record SalesFunnelProjection(
    Guid TenantId,
    int OpenLeads,
    int QualifiedLeads,
    int OpenOpportunities,
    int WonDeals,
    decimal PipelineValue);
