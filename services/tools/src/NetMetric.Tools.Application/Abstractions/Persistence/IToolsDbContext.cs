using NetMetric.Tools.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.Tools.Application.Abstractions.Persistence;

public interface IToolsDbContext
{
    DbSet<ToolCategory> ToolCategories { get; }
    DbSet<ToolDefinition> ToolDefinitions { get; }
    DbSet<ToolRun> ToolRuns { get; }
    DbSet<ToolArtifact> ToolArtifacts { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
