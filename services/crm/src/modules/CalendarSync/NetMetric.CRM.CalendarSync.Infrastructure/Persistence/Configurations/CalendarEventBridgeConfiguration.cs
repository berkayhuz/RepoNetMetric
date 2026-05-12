using NetMetric.CRM.CalendarSync.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.CalendarSync.Infrastructure.Persistence.Configurations;

public sealed class CalendarEventBridgeConfiguration : IEntityTypeConfiguration<CalendarEventBridge>
{
    public void Configure(EntityTypeBuilder<CalendarEventBridge> builder)
    {
        builder.ToTable("CalendarEventBridges");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ExternalEventId).HasMaxLength(200).IsRequired();
    }
}
