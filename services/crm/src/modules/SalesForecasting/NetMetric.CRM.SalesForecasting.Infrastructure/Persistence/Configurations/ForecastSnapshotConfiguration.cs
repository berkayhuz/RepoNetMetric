using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.SalesForecasting.Domain.Entities;

namespace NetMetric.CRM.SalesForecasting.Infrastructure.Persistence.Configurations;

internal sealed class ForecastSnapshotConfiguration : IEntityTypeConfiguration<ForecastSnapshot>
{
    public void Configure(EntityTypeBuilder<ForecastSnapshot> builder)
    {
        builder.ToTable("ForecastSnapshots");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(256).IsRequired();
        builder.Property(x => x.ForecastCategory).HasMaxLength(64).IsRequired();
        builder.HasIndex(x => new { x.TenantId, x.PeriodStart, x.PeriodEnd, x.OwnerUserId, x.Name }).IsUnique();
    }
}
