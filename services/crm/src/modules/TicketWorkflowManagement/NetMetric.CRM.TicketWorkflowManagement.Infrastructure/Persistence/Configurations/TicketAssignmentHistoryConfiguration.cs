using NetMetric.CRM.TicketWorkflowManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.TicketWorkflowManagement.Infrastructure.Persistence.Configurations;

public sealed class TicketAssignmentHistoryConfiguration : IEntityTypeConfiguration<TicketAssignmentHistory>
{
    public void Configure(EntityTypeBuilder<TicketAssignmentHistory> builder)
    {
        builder.ToTable("TicketAssignmentHistories");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Reason).HasMaxLength(500);
        builder.HasIndex(x => new { x.TenantId, x.TicketId, x.ChangedAtUtc });
    }
}
