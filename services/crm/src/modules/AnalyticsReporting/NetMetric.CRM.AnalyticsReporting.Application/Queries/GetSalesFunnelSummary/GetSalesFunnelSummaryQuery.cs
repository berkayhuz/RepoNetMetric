using NetMetric.CRM.AnalyticsReporting.Application.DTOs;
using MediatR;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetSalesFunnelSummary;

public sealed record GetSalesFunnelSummaryQuery(Guid TenantId) : IRequest<SalesFunnelSummaryDto>;
