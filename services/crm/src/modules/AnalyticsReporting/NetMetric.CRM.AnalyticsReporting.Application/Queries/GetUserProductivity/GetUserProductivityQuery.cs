using NetMetric.CRM.AnalyticsReporting.Application.DTOs;
using MediatR;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetUserProductivity;

public sealed record GetUserProductivityQuery(Guid TenantId) : IRequest<IReadOnlyCollection<ProductivityDto>>;