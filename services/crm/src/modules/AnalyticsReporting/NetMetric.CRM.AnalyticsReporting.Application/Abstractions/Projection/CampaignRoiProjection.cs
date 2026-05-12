namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record CampaignRoiProjection(
    Guid TenantId,
    string CampaignName,
    decimal Spend,
    decimal Revenue);
