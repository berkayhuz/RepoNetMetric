using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.AnalyticsReporting.Domain.Entities;

namespace NetMetric.CRM.AnalyticsReporting.Application.Abstractions.Persistence;

public interface IAnalyticsReportingDbContext
{
    DbSet<DashboardWidget> DashboardWidgets { get; }
    DbSet<ReportDefinition> ReportDefinitions { get; }
    DbSet<AnalyticsTenantSnapshot> TenantSnapshots { get; }
    DbSet<AnalyticsSalesFunnelSnapshot> SalesFunnelSnapshots { get; }
    DbSet<AnalyticsCampaignRoiSnapshot> CampaignRoiSnapshots { get; }
    DbSet<AnalyticsRevenueAgingSnapshot> RevenueAgingSnapshots { get; }
    DbSet<AnalyticsSupportKpiSnapshot> SupportKpiSnapshots { get; }
    DbSet<AnalyticsUserProductivitySnapshot> UserProductivitySnapshots { get; }
    DbSet<AnalyticsProjectionRun> ProjectionRuns { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
