using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetMetric.CRM.Sales;

namespace NetMetric.CRM.OpportunityManagement.Infrastructure.Persistence.Configurations;

public sealed class OpportunityContactConfiguration : IEntityTypeConfiguration<OpportunityContact>
{
    public void Configure(EntityTypeBuilder<OpportunityContact> builder)
    {
        builder.ToTable("OpportunityContacts");
        builder.HasIndex(x => new { x.TenantId, x.OpportunityId, x.ContactId }).IsUnique();
        builder.HasIndex(x => new { x.TenantId, x.OpportunityId, x.IsPrimary }).HasFilter("[IsPrimary] = 1");
    }
}
