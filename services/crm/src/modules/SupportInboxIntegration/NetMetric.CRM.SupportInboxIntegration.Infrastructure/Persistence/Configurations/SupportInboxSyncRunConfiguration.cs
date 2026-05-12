using NetMetric.CRM.SupportInboxIntegration.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.SupportInboxIntegration.Infrastructure.Persistence.Configurations;

public sealed class SupportInboxSyncRunConfiguration : IEntityTypeConfiguration<SupportInboxSyncRun>
{
    public void Configure(EntityTypeBuilder<SupportInboxSyncRun> builder)
    {
        builder.ToTable("SupportInboxSyncRuns");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ErrorMessage).HasMaxLength(2000);
    }
}
