using NetMetric.CRM.SalesForecasting.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.SalesForecasting.Infrastructure.Persistence.Configurations;

internal sealed class SalesQuotaConfiguration : IEntityTypeConfiguration<SalesQuota>
{
    public void Configure(EntityTypeBuilder<SalesQuota> builder)
    {
        builder.ToTable("SalesQuotas");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CurrencyCode).HasMaxLength(8).IsRequired();
        builder.HasIndex(x => new { x.TenantId, x.PeriodStart, x.PeriodEnd, x.OwnerUserId }).IsUnique();
    }
}