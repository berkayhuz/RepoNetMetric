using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.TicketWorkflowManagement.Domain.Entities;
using NetMetric.Repository;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Abstractions.Persistence;

public interface ITicketWorkflowManagementDbContext : IUnitOfWork
{
    DbSet<TicketQueue> TicketQueues { get; }
    DbSet<TicketQueueMembership> TicketQueueMemberships { get; }
    DbSet<TicketAssignmentHistory> TicketAssignmentHistories { get; }
    DbSet<TicketStatusHistory> TicketStatusHistories { get; }
}
