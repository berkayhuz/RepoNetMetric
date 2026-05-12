using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Core;
using NetMetric.CRM.Sales;

namespace NetMetric.CRM.LeadManagement.Application.Abstractions.Persistence;

public interface ILeadManagementDbContext
{
    DbSet<Lead> Leads { get; }
    DbSet<LeadScore> LeadScores { get; }
    DbSet<LeadOwnershipHistory> LeadOwnershipHistories { get; }
    DbSet<Opportunity> Opportunities { get; }
    DbSet<Customer> Customers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
