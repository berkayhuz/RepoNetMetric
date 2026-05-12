namespace NetMetric.CRM.SalesForecasting.Contracts.Requests;

public sealed record CreateForecastAdjustmentRequest(
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    decimal Amount,
    string Reason,
    string? Notes);