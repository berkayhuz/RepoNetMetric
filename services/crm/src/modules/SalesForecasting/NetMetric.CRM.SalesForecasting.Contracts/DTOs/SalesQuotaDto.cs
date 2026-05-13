namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record SalesQuotaDto(
    Guid Id,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    decimal Amount,
    string CurrencyCode,
    string? Notes,
    string RowVersion);
