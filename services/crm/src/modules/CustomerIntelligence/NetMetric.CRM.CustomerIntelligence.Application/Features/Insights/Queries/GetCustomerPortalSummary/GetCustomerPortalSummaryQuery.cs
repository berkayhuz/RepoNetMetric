using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Insights.Queries.GetCustomerPortalSummary;

public sealed record GetCustomerPortalSummaryQuery(Guid CustomerId) : IRequest<CustomerPortalSummaryDto>;
