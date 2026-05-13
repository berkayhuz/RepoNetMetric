using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.QuoteManagement.Infrastructure.Persistence;

namespace NetMetric.CRM.QuoteManagement.Infrastructure.Health;

public sealed class QuoteManagementDbContextHealthCheck(QuoteManagementDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
        => await dbContext.Database.CanConnectAsync(cancellationToken)
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy();
}
