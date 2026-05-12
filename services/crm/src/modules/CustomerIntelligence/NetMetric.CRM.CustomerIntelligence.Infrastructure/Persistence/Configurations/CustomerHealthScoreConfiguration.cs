using NetMetric.CRM.CustomerIntelligence.Domain.Entities.CustomerHealthScores;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.CustomerIntelligence.Infrastructure.Persistence.Configurations;

public sealed class CustomerHealthScoreConfiguration : IEntityTypeConfiguration<CustomerHealthScore>
{
    public void Configure(EntityTypeBuilder<CustomerHealthScore> builder)
    {
        builder.ToTable("CustomerHealthScores");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.EntityType).HasMaxLength(100);
        builder.Property(x => x.DataJson).HasColumnType("nvarchar(max)");
        builder.Property(x => x.OccurredAtUtc).IsRequired();
        builder.HasIndex(x => new { x.TenantId, x.Name });
    }
}
