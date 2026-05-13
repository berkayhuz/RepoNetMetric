using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.Tools.Domain.Entities;

namespace NetMetric.Tools.Persistence.Configurations;

public sealed class ToolCategoryConfiguration : IEntityTypeConfiguration<ToolCategory>
{
    public void Configure(EntityTypeBuilder<ToolCategory> builder)
    {
        builder.ToTable("tools_categories");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Slug).HasMaxLength(64).IsRequired();
        builder.Property(x => x.Title).HasMaxLength(128).IsRequired();
        builder.Property(x => x.Description).HasMaxLength(512).IsRequired();
        builder.HasIndex(x => x.Slug).IsUnique();
    }
}
