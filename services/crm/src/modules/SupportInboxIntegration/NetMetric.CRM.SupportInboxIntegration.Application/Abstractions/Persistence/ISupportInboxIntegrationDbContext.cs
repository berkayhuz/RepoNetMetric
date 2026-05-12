using NetMetric.CRM.SupportInboxIntegration.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Abstractions.Persistence;

public interface ISupportInboxIntegrationDbContext
{
    DbSet<SupportInboxConnection> Connections { get; }
    DbSet<SupportInboxRule> Rules { get; }
    DbSet<SupportInboxMessage> Messages { get; }
    DbSet<SupportInboxSyncRun> SyncRuns { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
