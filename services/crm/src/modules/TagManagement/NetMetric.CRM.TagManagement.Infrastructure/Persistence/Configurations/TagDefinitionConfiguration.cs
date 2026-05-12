using NetMetric.CRM.TagManagement.Domain.Entities.TagDefinitions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.TagManagement.Infrastructure.Persistence.Configurations;

public sealed class TagDefinitionConfiguration : IEntityTypeConfiguration<TagDefinition>
{
    public void Configure(EntityTypeBuilder<TagDefinition> builder)
    {
        builder.ToTable("TagDefinitions");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.EntityType).HasMaxLength(100);
        builder.Property(x => x.DataJson).HasColumnType("nvarchar(max)");
        builder.Property(x => x.OccurredAtUtc).IsRequired();
        builder.HasIndex(x => new { x.TenantId, x.Name });
    }
}
