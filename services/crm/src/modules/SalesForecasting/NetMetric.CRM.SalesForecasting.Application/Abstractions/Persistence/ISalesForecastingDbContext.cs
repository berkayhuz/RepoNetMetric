using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Sales;
using NetMetric.CRM.SalesForecasting.Domain.Entities;

namespace NetMetric.CRM.SalesForecasting.Application.Abstractions.Persistence;

public interface ISalesForecastingDbContext
{
    DbSet<Opportunity> Opportunities { get; }
    DbSet<Deal> Deals { get; }
    DbSet<SalesQuota> SalesQuotas { get; }
    DbSet<ForecastAdjustment> ForecastAdjustments { get; }
    DbSet<ForecastSnapshot> ForecastSnapshots { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
