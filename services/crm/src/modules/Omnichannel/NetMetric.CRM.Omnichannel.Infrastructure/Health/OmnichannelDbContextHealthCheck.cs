using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.Omnichannel.Infrastructure.Persistence;

namespace NetMetric.CRM.Omnichannel.Infrastructure.Health;

public sealed class OmnichannelDbContextHealthCheck(OmnichannelDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        => await dbContext.Database.CanConnectAsync(cancellationToken)
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy("Omnichannel database is unavailable.");
}
