using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;
using NetMetric.Exceptions;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Insights.Queries.GetCustomerPortalSummary;

public sealed class GetCustomerPortalSummaryQueryHandler : IRequestHandler<GetCustomerPortalSummaryQuery, CustomerPortalSummaryDto>
{
    public Task<CustomerPortalSummaryDto> Handle(GetCustomerPortalSummaryQuery request, CancellationToken cancellationToken)
        => throw new ForbiddenAppException("Customer portal summary is disabled until a production customer intelligence read model is configured.");
}
