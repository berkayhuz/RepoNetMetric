using NetMetric.CRM.TicketSlaManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.TicketSlaManagement.Infrastructure.Persistence.Configurations;

public sealed class TicketEscalationRunConfiguration : IEntityTypeConfiguration<TicketEscalationRun>
{
    public void Configure(EntityTypeBuilder<TicketEscalationRun> builder)
    {
        builder.ToTable("TicketEscalationRuns");
        builder.Property(x => x.Note).HasMaxLength(500).IsRequired();
        builder.HasIndex(x => new { x.TenantId, x.TicketId, x.ExecutedAtUtc });
    }
}
