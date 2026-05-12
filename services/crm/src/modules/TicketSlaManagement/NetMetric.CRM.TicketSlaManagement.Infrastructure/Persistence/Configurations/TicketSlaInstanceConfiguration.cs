using NetMetric.CRM.TicketSlaManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.TicketSlaManagement.Infrastructure.Persistence.Configurations;

public sealed class TicketSlaInstanceConfiguration : IEntityTypeConfiguration<TicketSlaInstance>
{
    public void Configure(EntityTypeBuilder<TicketSlaInstance> builder)
    {
        builder.ToTable("TicketSlaInstances");
        builder.HasIndex(x => new { x.TenantId, x.TicketId }).IsUnique().HasFilter("[IsDeleted] = 0");
        builder.HasOne(x => x.SlaPolicy)
            .WithMany()
            .HasForeignKey(x => x.SlaPolicyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
