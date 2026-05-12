using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.ServiceManagement;
using NetMetric.CRM.TicketSlaManagement.Domain.Entities;
using NetMetric.Repository;

namespace NetMetric.CRM.TicketSlaManagement.Application.Abstractions.Persistence;

public interface ITicketSlaManagementDbContext : IUnitOfWork
{
    DbSet<SlaPolicy> SlaPolicies { get; }
    DbSet<SlaEscalationRule> SlaEscalationRules { get; }
    DbSet<TicketSlaInstance> TicketSlaInstances { get; }
    DbSet<TicketEscalationRun> TicketEscalationRuns { get; }
}
