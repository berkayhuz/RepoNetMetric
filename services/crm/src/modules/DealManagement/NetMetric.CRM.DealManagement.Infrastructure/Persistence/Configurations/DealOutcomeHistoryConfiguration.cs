using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.DealManagement.Domain.Entities;

namespace NetMetric.CRM.DealManagement.Infrastructure.Persistence.Configurations;

internal sealed class DealOutcomeHistoryConfiguration : IEntityTypeConfiguration<DealOutcomeHistory>
{
    public void Configure(EntityTypeBuilder<DealOutcomeHistory> builder)
    {
        builder.ToTable("DealOutcomeHistories");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Outcome).HasMaxLength(32).IsRequired();
        builder.Property(x => x.Stage).HasMaxLength(32).IsRequired();
        builder.Property(x => x.Note).HasMaxLength(2000);
        builder.HasIndex(x => new { x.TenantId, x.DealId, x.OccurredAt });
    }
}
