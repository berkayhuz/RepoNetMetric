using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Activities;
using NetMetric.CRM.Sales;
using NetMetric.Repository;

namespace NetMetric.CRM.OpportunityManagement.Application.Abstractions.Persistence;

public interface IOpportunityManagementDbContext : IUnitOfWork
{
    DbSet<Opportunity> Opportunities { get; }
    DbSet<OpportunityProduct> OpportunityProducts { get; }
    DbSet<OpportunityContact> OpportunityContacts { get; }
    DbSet<OpportunityStageHistory> OpportunityStageHistories { get; }
    DbSet<Quote> Quotes { get; }
    DbSet<QuoteItem> QuoteItems { get; }
    DbSet<LostReason> LostReasons { get; }
    DbSet<Deal> Deals { get; }
    DbSet<Activity> Activities { get; }
}
