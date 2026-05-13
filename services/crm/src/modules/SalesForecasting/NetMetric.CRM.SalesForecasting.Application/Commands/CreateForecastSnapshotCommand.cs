using MediatR;
using NetMetric.CRM.SalesForecasting.Contracts.DTOs;

namespace NetMetric.CRM.SalesForecasting.Application.Commands;

public sealed record CreateForecastSnapshotCommand(string Name, DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId, string ForecastCategory, string? Notes) : IRequest<ForecastSnapshotDto>;
