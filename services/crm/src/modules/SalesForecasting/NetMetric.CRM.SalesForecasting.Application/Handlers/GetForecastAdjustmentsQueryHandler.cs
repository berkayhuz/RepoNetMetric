using NetMetric.CRM.SalesForecasting.Application.Abstractions.Persistence;
using NetMetric.CRM.SalesForecasting.Application.Queries;
using NetMetric.CRM.SalesForecasting.Contracts.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.SalesForecasting.Application.Handlers;

public sealed class GetForecastAdjustmentsQueryHandler(ISalesForecastingDbContext dbContext) : IRequestHandler<GetForecastAdjustmentsQuery, IReadOnlyList<ForecastAdjustmentDto>>
{
    public async Task<IReadOnlyList<ForecastAdjustmentDto>> Handle(GetForecastAdjustmentsQuery request, CancellationToken cancellationToken)
    {
        var adjustments = await SalesForecastingQueryHelper.BuildAdjustmentQuery(dbContext, request.PeriodStart, request.PeriodEnd, request.OwnerUserId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return adjustments.Select(SalesForecastingMappings.ToDto).ToList();
    }
}