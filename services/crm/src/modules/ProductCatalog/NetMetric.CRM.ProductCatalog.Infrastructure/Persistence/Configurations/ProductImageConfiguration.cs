using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.ProductCatalog.Domain.Entities.Products;

namespace NetMetric.CRM.ProductCatalog.Infrastructure.Persistence.Configurations;

public sealed class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("ProductImage");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.AltText).HasMaxLength(256);
        builder.HasIndex(x => new { x.TenantId, x.ProductId, x.IsPrimary }).HasFilter("[IsDeleted] = 0");
        builder.HasIndex(x => new { x.TenantId, x.ProductId, x.SortOrder }).HasFilter("[IsDeleted] = 0");
    }
}
