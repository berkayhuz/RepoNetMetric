using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.FinanceOperations.Domain.Entities.Invoices;
using NetMetric.CRM.FinanceOperations.Domain.Entities.Orders;
using NetMetric.CRM.FinanceOperations.Domain.Entities.Payments;
using NetMetric.Repository;

namespace NetMetric.CRM.FinanceOperations.Application.Abstractions.Persistence;

public interface IFinanceOperationsDbContext : IUnitOfWork
{
    DbSet<SalesOrder> Orders { get; }
    DbSet<Invoice> Invoices { get; }
    DbSet<PaymentRecord> Payments { get; }
}
