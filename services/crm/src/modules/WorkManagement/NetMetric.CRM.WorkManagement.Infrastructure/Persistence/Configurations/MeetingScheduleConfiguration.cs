using NetMetric.CRM.WorkManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.WorkManagement.Infrastructure.Persistence.Configurations;

public sealed class MeetingScheduleConfiguration : IEntityTypeConfiguration<MeetingSchedule>
{
    public void Configure(EntityTypeBuilder<MeetingSchedule> builder)
    {
        builder.ToTable("MeetingSchedules");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title).HasMaxLength(160).IsRequired();
        builder.Property(x => x.OrganizerEmail).HasMaxLength(320).IsRequired();
        builder.Property(x => x.AttendeeSummary).HasMaxLength(2000).IsRequired();
    }
}
