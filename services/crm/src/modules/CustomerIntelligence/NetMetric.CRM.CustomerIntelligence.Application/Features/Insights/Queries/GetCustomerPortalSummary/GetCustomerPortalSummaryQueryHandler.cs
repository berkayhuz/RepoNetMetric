// <copyright file="GetCustomerPortalSummaryQueryHandler.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;
using NetMetric.Exceptions;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Insights.Queries.GetCustomerPortalSummary;

public sealed class GetCustomerPortalSummaryQueryHandler : IRequestHandler<GetCustomerPortalSummaryQuery, CustomerPortalSummaryDto>
{
    public Task<CustomerPortalSummaryDto> Handle(GetCustomerPortalSummaryQuery request, CancellationToken cancellationToken)
        => throw new ForbiddenAppException("Customer portal summary is disabled until a production customer intelligence read model is configured.");
}
