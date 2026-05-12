using NetMetric.CRM.DealManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetMetric.CRM.DealManagement.Infrastructure.Persistence.Configurations;

internal sealed class WinLossReviewConfiguration : IEntityTypeConfiguration<WinLossReview>
{
    public void Configure(EntityTypeBuilder<WinLossReview> builder)
    {
        builder.ToTable("WinLossReviews");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Outcome).HasMaxLength(20).IsRequired();
        builder.Property(x => x.Summary).HasMaxLength(4000);
        builder.Property(x => x.Strengths).HasMaxLength(4000);
        builder.Property(x => x.Risks).HasMaxLength(4000);
        builder.Property(x => x.CompetitorName).HasMaxLength(256);
        builder.Property(x => x.CompetitorPrice).HasPrecision(18, 2);
        builder.Property(x => x.CustomerFeedback).HasMaxLength(4000);
        builder.HasIndex(x => new { x.TenantId, x.DealId }).IsUnique();
    }
}
