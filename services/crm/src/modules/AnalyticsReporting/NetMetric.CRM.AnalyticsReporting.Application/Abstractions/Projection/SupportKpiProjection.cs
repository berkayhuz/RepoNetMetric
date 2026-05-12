namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record SupportKpiProjection(
    Guid TenantId,
    int OpenTickets,
    int OverdueTickets,
    decimal FirstResponseHours,
    decimal ResolutionHours);
