using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetSalesFunnelSummary;

public sealed record GetSalesFunnelSummaryQuery(Guid TenantId) : IRequest<SalesFunnelSummaryDto>;
