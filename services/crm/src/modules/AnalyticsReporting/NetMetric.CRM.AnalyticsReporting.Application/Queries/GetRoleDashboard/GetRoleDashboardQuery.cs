using NetMetric.CRM.AnalyticsReporting.Application.DTOs;
using MediatR;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetRoleDashboard;

public sealed record GetRoleDashboardQuery(string RoleName) : IRequest<DashboardSummaryDto>;
