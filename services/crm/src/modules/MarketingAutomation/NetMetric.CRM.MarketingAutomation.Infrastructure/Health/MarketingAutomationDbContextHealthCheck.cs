using NetMetric.CRM.MarketingAutomation.Infrastructure.Persistence;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetMetric.CRM.MarketingAutomation.Infrastructure.Health;

public sealed class MarketingAutomationDbContextHealthCheck(MarketingAutomationDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("MarketingAutomation database is reachable.")
            : HealthCheckResult.Unhealthy("MarketingAutomation database is not reachable.");
    }
}
