using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.AnalyticsReporting.Infrastructure.Persistence;

namespace NetMetric.CRM.AnalyticsReporting.Infrastructure.Health;

public sealed class AnalyticsReportingDbContextHealthCheck(AnalyticsReportingDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("AnalyticsReporting database is reachable.")
            : HealthCheckResult.Unhealthy("AnalyticsReporting database is not reachable.");
    }
}
