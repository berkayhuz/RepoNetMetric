using NetMetric.CRM.ArtificialIntelligence.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.ArtificialIntelligence.Application.Abstractions.Persistence;

public interface IArtificialIntelligenceDbContext
{
    DbSet<AiProviderConnection> ProviderConnections { get; }
    DbSet<AiAutomationPolicy> AutomationPolicies { get; }
    DbSet<AiInsightRun> InsightRuns { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
