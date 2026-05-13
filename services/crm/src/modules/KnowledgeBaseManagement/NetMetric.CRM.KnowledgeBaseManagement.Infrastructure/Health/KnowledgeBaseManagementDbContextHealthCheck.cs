using Microsoft.Extensions.Diagnostics.HealthChecks;
using NetMetric.CRM.KnowledgeBaseManagement.Infrastructure.Persistence;

namespace NetMetric.CRM.KnowledgeBaseManagement.Infrastructure.Health;

public sealed class KnowledgeBaseManagementDbContextHealthCheck(KnowledgeBaseManagementDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("Knowledge base database is reachable.")
            : HealthCheckResult.Unhealthy("Knowledge base database is not reachable.");
    }
}
