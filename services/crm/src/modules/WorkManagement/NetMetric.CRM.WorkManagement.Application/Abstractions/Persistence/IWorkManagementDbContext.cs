using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.WorkManagement.Domain.Entities;

namespace NetMetric.CRM.WorkManagement.Application.Abstractions.Persistence;

public interface IWorkManagementDbContext
{
    DbSet<WorkTask> Tasks { get; }
    DbSet<ActivityLog> Activities { get; }
    DbSet<MeetingSchedule> Meetings { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
