using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.ArtificialIntelligence.Infrastructure.Persistence;

namespace NetMetric.CRM.ArtificialIntelligence.Infrastructure.Health;

public sealed class ArtificialIntelligenceDbContextHealthCheck(ArtificialIntelligenceDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        => await dbContext.Database.CanConnectAsync(cancellationToken)
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy("Artificial intelligence database is unavailable.");
}
