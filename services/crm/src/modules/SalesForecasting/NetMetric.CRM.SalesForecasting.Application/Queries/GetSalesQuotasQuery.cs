using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using NetMetric.CRM.SalesForecasting.Contracts.DTOs;

namespace NetMetric.CRM.SalesForecasting.Application.Queries;

public sealed record GetSalesQuotasQuery(DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId) : IRequest<IReadOnlyList<SalesQuotaDto>>;
