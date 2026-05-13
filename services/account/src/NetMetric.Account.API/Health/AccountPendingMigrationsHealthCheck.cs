using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.Account.Persistence;

namespace NetMetric.Account.Api.Health;

public sealed class AccountPendingMigrationsHealthCheck(AccountDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var pendingMigrations = await dbContext.Database
            .GetPendingMigrationsAsync(cancellationToken);

        var pending = pendingMigrations.ToArray();
        return pending.Length == 0
            ? HealthCheckResult.Healthy("No pending Account database migrations.")
            : HealthCheckResult.Unhealthy($"Pending Account database migrations detected: {string.Join(',', pending)}");
    }
}
