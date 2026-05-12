using NetMetric.CRM.KnowledgeBaseManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace NetMetric.CRM.KnowledgeBaseManagement.Application.Abstractions.Persistence;

public interface IKnowledgeBaseManagementDbContext
{
    DbSet<KnowledgeBaseCategory> Categories { get; }
    DbSet<KnowledgeBaseArticle> Articles { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
