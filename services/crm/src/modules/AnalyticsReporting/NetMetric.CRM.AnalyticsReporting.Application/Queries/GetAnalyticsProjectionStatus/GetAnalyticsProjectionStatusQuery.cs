using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetAnalyticsProjectionStatus;

public sealed record GetAnalyticsProjectionStatusQuery(Guid TenantId) : IRequest<AnalyticsProjectionStatusDto>;
