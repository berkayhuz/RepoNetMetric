using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.Account.Persistence;

namespace NetMetric.Account.Api.Health;

public sealed class AccountDbHealthCheck(AccountDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);

        return canConnect
            ? HealthCheckResult.Healthy("Account database is reachable.")
            : HealthCheckResult.Unhealthy("Account database is not reachable.");
    }
}
