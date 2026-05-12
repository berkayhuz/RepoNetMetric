using NetMetric.CRM.IntegrationHub.Infrastructure.Persistence;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetMetric.CRM.IntegrationHub.Infrastructure.Health;

public sealed class IntegrationHubDbContextHealthCheck(IntegrationHubDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("IntegrationHub database is reachable.")
            : HealthCheckResult.Unhealthy("IntegrationHub database is not reachable.");
    }
}
