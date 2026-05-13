using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.TicketSlaManagement.Domain.Entities;

namespace NetMetric.CRM.TicketSlaManagement.Infrastructure.Persistence.Configurations;

public sealed class SlaEscalationRuleConfiguration : IEntityTypeConfiguration<SlaEscalationRule>
{
    public void Configure(EntityTypeBuilder<SlaEscalationRule> builder)
    {
        builder.ToTable("SlaEscalationRules");
        builder.HasOne(x => x.SlaPolicy)
            .WithMany()
            .HasForeignKey(x => x.SlaPolicyId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
