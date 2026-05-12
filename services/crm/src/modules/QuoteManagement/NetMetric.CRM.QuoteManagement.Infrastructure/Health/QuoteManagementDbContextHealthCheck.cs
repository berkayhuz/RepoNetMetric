using NetMetric.CRM.QuoteManagement.Infrastructure.Persistence;
using Microsoft.Extensions.Diagnostics.HealthChecks;

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