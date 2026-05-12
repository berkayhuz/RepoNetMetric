using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.DealManagement.Domain.Entities;
using NetMetric.CRM.Sales;
using NetMetric.Repository;

namespace NetMetric.CRM.DealManagement.Application.Abstractions.Persistence;

public interface IDealManagementDbContext : IUnitOfWork
{
    DbSet<Deal> Deals { get; }
    DbSet<LostReason> LostReasons { get; }
    DbSet<DealOutcomeHistory> DealOutcomeHistories { get; }
    DbSet<WinLossReview> WinLossReviews { get; }
}
