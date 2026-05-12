using NetMetric.CRM.TicketManagement.Infrastructure.Persistence;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetMetric.CRM.TicketManagement.Infrastructure.Health;

public sealed class TicketManagementDbContextHealthCheck(TicketManagementDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? HealthCheckResult.Healthy("TicketManagement database is reachable.")
            : HealthCheckResult.Unhealthy("TicketManagement database is not reachable.");
    }
}
