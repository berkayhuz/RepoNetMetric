using NetMetric.CRM.CalendarSync.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.CalendarSync.Infrastructure.Persistence.Configurations;

public sealed class CalendarSyncRunConfiguration : IEntityTypeConfiguration<CalendarSyncRun>
{
    public void Configure(EntityTypeBuilder<CalendarSyncRun> builder)
    {
        builder.ToTable("CalendarSyncRuns");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ErrorMessage).HasMaxLength(1000);
    }
}
