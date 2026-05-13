using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetRoleDashboard;

public sealed record GetRoleDashboardQuery(string RoleName) : IRequest<DashboardSummaryDto>;
