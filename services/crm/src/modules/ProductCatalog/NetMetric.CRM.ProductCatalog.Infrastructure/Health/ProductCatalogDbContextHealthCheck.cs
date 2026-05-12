using NetMetric.CRM.ProductCatalog.Infrastructure.Persistence;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetMetric.CRM.ProductCatalog.Infrastructure.Health;

public sealed class ProductCatalogDbContextHealthCheck(ProductCatalogDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("ProductCatalog database is reachable.")
            : HealthCheckResult.Unhealthy("ProductCatalog database is not reachable.");
    }
}
