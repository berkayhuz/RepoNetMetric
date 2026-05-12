using NetMetric.CRM.SalesForecasting.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.SalesForecasting.Application.Commands;

public sealed record CreateForecastAdjustmentCommand(DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId, decimal Amount, string Reason, string? Notes) : IRequest<ForecastAdjustmentDto>;