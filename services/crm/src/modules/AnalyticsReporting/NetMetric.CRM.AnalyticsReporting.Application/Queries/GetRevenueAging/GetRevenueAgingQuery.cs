using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetRevenueAging;

public sealed record GetRevenueAgingQuery(Guid TenantId) : IRequest<IReadOnlyCollection<RevenueAgingDto>>;
