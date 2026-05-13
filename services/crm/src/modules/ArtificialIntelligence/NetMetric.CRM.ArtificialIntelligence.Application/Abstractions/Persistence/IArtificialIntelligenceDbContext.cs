using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.ArtificialIntelligence.Domain.Entities;

namespace NetMetric.CRM.ArtificialIntelligence.Application.Abstractions.Persistence;

public interface IArtificialIntelligenceDbContext
{
    DbSet<AiProviderConnection> ProviderConnections { get; }
    DbSet<AiAutomationPolicy> AutomationPolicies { get; }
    DbSet<AiInsightRun> InsightRuns { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
