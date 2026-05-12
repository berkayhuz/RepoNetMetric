using NetMetric.CRM.CalendarSync.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CalendarSync.Application.Queries.GetCalendarOverview;

public sealed record GetCalendarOverviewQuery : IRequest<CalendarOverviewDto>;
