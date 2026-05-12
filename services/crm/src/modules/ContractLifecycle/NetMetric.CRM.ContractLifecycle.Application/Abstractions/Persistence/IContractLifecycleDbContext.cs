using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.ContractLifecycle.Domain.Entities.Contracts;
using NetMetric.CRM.ContractLifecycle.Domain.Entities.Renewals;
using NetMetric.CRM.ContractLifecycle.Domain.Entities.Subscriptions;
using NetMetric.Repository;

namespace NetMetric.CRM.ContractLifecycle.Application.Abstractions.Persistence;

public interface IContractLifecycleDbContext : IUnitOfWork
{
    DbSet<ContractRecord> Contracts { get; }
    DbSet<SubscriptionRecord> Subscriptions { get; }
    DbSet<RenewalTracker> Renewals { get; }
}
