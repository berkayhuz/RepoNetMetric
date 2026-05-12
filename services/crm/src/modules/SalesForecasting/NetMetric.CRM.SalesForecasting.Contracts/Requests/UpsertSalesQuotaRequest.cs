namespace NetMetric.CRM.SalesForecasting.Contracts.Requests;

public sealed record UpsertSalesQuotaRequest(
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    Guid? OwnerUserId,
    decimal Amount,
    string CurrencyCode,
    string? Notes,
    string? RowVersion);