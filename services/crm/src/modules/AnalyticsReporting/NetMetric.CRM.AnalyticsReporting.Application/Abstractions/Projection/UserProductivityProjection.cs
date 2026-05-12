namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Projection;

public sealed record UserProductivityProjection(
    Guid TenantId,
    Guid UserId,
    string UserName,
    int ActivitiesCompleted,
    int TicketsClosed,
    int DealsWon);
