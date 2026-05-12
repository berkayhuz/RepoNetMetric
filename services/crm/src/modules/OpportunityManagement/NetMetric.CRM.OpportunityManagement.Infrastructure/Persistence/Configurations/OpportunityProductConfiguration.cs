using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.Sales;

namespace NetMetric.CRM.OpportunityManagement.Infrastructure.Persistence.Configurations;

public sealed class OpportunityProductConfiguration : IEntityTypeConfiguration<OpportunityProduct>
{
    public void Configure(EntityTypeBuilder<OpportunityProduct> builder)
    {
        builder.ToTable("OpportunityProducts");
        builder.Property(x => x.UnitPrice).HasPrecision(18, 2).HasColumnType("decimal(18,2)");
        builder.Property(x => x.DiscountRate).HasPrecision(18, 2).HasColumnType("decimal(5,2)");
        builder.Property(x => x.VatRate).HasPrecision(18, 2).HasColumnType("decimal(5,2)");
        builder.HasIndex(x => new { x.TenantId, x.OpportunityId, x.ProductId }).IsUnique();
    }
}
