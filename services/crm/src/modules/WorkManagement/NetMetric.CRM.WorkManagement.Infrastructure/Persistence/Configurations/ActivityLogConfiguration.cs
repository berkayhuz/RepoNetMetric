using NetMetric.CRM.WorkManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.WorkManagement.Infrastructure.Persistence.Configurations;

public sealed class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog>
{
    public void Configure(EntityTypeBuilder<ActivityLog> builder)
    {
        builder.ToTable("WorkActivities");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Subject).HasMaxLength(180).IsRequired();
    }
}
