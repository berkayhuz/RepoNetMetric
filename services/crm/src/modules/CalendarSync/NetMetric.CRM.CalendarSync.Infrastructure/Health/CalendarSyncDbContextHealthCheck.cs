using NetMetric.CRM.CalendarSync.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetMetric.CRM.CalendarSync.Infrastructure.Health;

public sealed class CalendarSyncDbContextHealthCheck(CalendarSyncDbContext dbContext) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        => await dbContext.Database.CanConnectAsync(cancellationToken)
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy("Calendar sync database is unavailable.");
}
