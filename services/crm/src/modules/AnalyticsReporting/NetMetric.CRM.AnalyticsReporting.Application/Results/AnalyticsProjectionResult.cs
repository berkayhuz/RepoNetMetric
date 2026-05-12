namespace NetMetric.CRM.AnalyticsReporting.Application.Results;

public sealed record AnalyticsProjectionResult(
    string CorrelationId,
    bool Succeeded,
    int ProjectedTenantCount,
    string? ErrorMessage);
