using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.Sales;

namespace NetMetric.CRM.LeadManagement.Infrastructure.Persistence.Configurations;

public sealed class LeadOwnershipHistoryConfiguration : IEntityTypeConfiguration<LeadOwnershipHistory>
{
    public void Configure(EntityTypeBuilder<LeadOwnershipHistory> builder)
    {
        builder.ToTable("LeadOwnershipHistories");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.AssignmentReason).HasMaxLength(500);
        builder.Property(x => x.AssignmentRuleId).HasMaxLength(128);
        builder.Property(x => x.RowVersion).IsRowVersion();

        builder.HasIndex(x => new { x.TenantId, x.LeadId, x.AssignedAt });

        builder.HasOne(x => x.Lead)
            .WithMany(x => x.OwnershipHistories)
            .HasForeignKey(x => x.LeadId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
