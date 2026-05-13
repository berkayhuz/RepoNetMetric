using MediatR;
using NetMetric.CRM.SalesForecasting.Contracts.DTOs;

namespace NetMetric.CRM.SalesForecasting.Application.Commands;

public sealed record UpsertSalesQuotaCommand(DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId, decimal Amount, string CurrencyCode, string? Notes, string? RowVersion) : IRequest<SalesQuotaDto>;
