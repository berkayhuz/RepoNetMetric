namespace NetMetric.CRM.SalesForecasting.Contracts.Requests;

public sealed record CreateForecastSnapshotRequest(
    string Name,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    string ForecastCategory,
    string? Notes);
