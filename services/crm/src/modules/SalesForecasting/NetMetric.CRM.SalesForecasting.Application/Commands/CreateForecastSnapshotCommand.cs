using NetMetric.CRM.SalesForecasting.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.SalesForecasting.Application.Commands;

public sealed record CreateForecastSnapshotCommand(string Name, DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId, string ForecastCategory, string? Notes) : IRequest<ForecastSnapshotDto>;