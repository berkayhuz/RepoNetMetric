using NetMetric.CRM.SupportInboxIntegration.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.SupportInboxIntegration.Infrastructure.Persistence.Configurations;

public sealed class SupportInboxMessageConfiguration : IEntityTypeConfiguration<SupportInboxMessage>
{
    public void Configure(EntityTypeBuilder<SupportInboxMessage> builder)
    {
        builder.ToTable("SupportInboxMessages");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ExternalMessageId).HasMaxLength(300).IsRequired();
        builder.Property(x => x.FromAddress).HasMaxLength(320).IsRequired();
        builder.Property(x => x.Subject).HasMaxLength(500).IsRequired();
        builder.Property(x => x.ProcessingError).HasMaxLength(2000);
        builder.HasIndex(x => new { x.TenantId, x.ConnectionId, x.ExternalMessageId }).IsUnique().HasFilter("[IsDeleted] = 0");
    }
}
