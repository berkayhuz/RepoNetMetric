using NetMetric.CRM.SalesForecasting.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.SalesForecasting.Application.Queries;

public sealed record GetOpportunityForecastRowsQuery(DateOnly PeriodStart, DateOnly PeriodEnd, Guid? OwnerUserId) : IRequest<IReadOnlyList<OpportunityForecastRowDto>>;