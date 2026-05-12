using NetMetric.CRM.AnalyticsReporting.Application.DTOs;
using MediatR;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetSupportKpis;

public sealed record GetSupportKpisQuery(Guid TenantId) : IRequest<IReadOnlyCollection<SupportKpiDto>>;
