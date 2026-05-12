using System;
using System.Collections.Generic;
using System.Text;
using NetMetric.CRM.SalesForecasting.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.SalesForecasting.Application.Queries;

public sealed record GetForecastSnapshotsQuery(DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId) : IRequest<IReadOnlyList<ForecastSnapshotDto>>;