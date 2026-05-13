using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetTenantReportSummary;

public sealed record GetTenantReportSummaryQuery(Guid TenantId) : IRequest<IReadOnlyCollection<TenantReportSummaryDto>>;
