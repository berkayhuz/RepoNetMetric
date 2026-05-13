using MediatR;
using NetMetric.CRM.CalendarSync.Contracts.DTOs;

namespace NetMetric.CRM.CalendarSync.Application.Queries.GetCalendarOverview;

public sealed record GetCalendarOverviewQuery : IRequest<CalendarOverviewDto>;
