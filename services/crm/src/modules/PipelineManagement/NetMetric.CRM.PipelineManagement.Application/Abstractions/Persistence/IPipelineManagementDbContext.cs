using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Core;
using NetMetric.CRM.PipelineManagement.Domain.Entities;
using NetMetric.CRM.Sales;

namespace NetMetric.CRM.PipelineManagement.Application.Abstractions.Persistence;

public interface IPipelineManagementDbContext
{
    DbSet<Lead> Leads { get; }
    DbSet<Opportunity> Opportunities { get; }
    DbSet<LostReason> LostReasons { get; }
    DbSet<OpportunityStageHistory> OpportunityStageHistories { get; }
    DbSet<Customer> Customers { get; }
    DbSet<Company> Companies { get; }
    DbSet<Pipeline> Pipelines { get; }
    DbSet<PipelineStage> PipelineStages { get; }
    DbSet<StageRequiredField> StageRequiredFields { get; }
    DbSet<StageExitCriteria> StageExitCriterias { get; }
    DbSet<ForecastCategoryMapping> ForecastCategoryMappings { get; }
    DbSet<PipelineTemplate> PipelineTemplates { get; }
    DbSet<PipelineSnapshot> PipelineSnapshots { get; }
    DbSet<PipelineHealthRule> PipelineHealthRules { get; }
    DbSet<PipelineAutomationTrigger> PipelineAutomationTriggers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
