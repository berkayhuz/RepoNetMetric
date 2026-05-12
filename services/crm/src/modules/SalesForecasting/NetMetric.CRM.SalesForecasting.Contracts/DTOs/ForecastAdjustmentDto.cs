namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record ForecastAdjustmentDto(
    Guid Id,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    decimal Amount,
    string Reason,
    string? Notes,
    string RowVersion);