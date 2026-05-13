using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.Auth.Infrastructure.Persistence;

namespace NetMetric.Auth.API.Health;

public sealed class AuthDatabaseHealthCheck(AuthDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        return await dbContext.Database.CanConnectAsync(cancellationToken)
            ? HealthCheckResult.Healthy("Identity database is reachable.")
            : HealthCheckResult.Unhealthy("Identity database is unreachable.");
    }
}
