using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.TenantManagement.Domain.Entities;

namespace NetMetric.CRM.TenantManagement.Application.Abstractions.Persistence;

public interface ITenantManagementDbContext
{
    DbSet<TenantProfile> TenantProfiles { get; }
    DbSet<TenantSettingEntry> TenantSettings { get; }
    DbSet<TenantFeatureFlag> TenantFeatureFlags { get; }
    DbSet<TenantModuleToggle> TenantModuleToggles { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
