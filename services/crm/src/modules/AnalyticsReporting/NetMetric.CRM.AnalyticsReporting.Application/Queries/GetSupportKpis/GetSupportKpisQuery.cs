using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetSupportKpis;

public sealed record GetSupportKpisQuery(Guid TenantId) : IRequest<IReadOnlyCollection<SupportKpiDto>>;
