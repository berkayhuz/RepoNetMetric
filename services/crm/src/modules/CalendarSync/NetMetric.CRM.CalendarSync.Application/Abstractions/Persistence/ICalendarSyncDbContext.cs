using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.CalendarSync.Domain.Entities;

namespace NetMetric.CRM.CalendarSync.Application.Abstractions.Persistence;

public interface ICalendarSyncDbContext
{
    DbSet<CalendarConnection> Connections { get; }
    DbSet<CalendarEventBridge> EventBridges { get; }
    DbSet<CalendarSyncRun> SyncRuns { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
