using NetMetric.CRM.ArtificialIntelligence.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.ArtificialIntelligence.Infrastructure.Persistence.Configurations;

public sealed class AiProviderConnectionConfiguration : IEntityTypeConfiguration<AiProviderConnection>
{
    public void Configure(EntityTypeBuilder<AiProviderConnection> builder)
    {
        builder.ToTable("AiProviderConnections");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(120).IsRequired();
        builder.Property(x => x.ModelName).HasMaxLength(120).IsRequired();
        builder.Property(x => x.Endpoint).HasMaxLength(300).IsRequired();
        builder.Property(x => x.SecretReference).HasMaxLength(300).IsRequired();
        builder.Property(x => x.Capabilities).HasMaxLength(200).IsRequired();
    }
}
