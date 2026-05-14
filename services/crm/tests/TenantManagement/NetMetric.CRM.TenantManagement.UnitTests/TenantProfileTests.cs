using FluentAssertions;
using NetMetric.CRM.TenantManagement.Domain.Entities;

namespace NetMetric.CRM.TenantManagement.UnitTests;

public sealed class TenantProfileTests
{
    [Fact]
    public void UpdateBranding_Should_Set_Expected_Fields()
    {
        var tenant = new TenantProfile(Guid.NewGuid(), "Acme");
        tenant.UpdateBranding("crm.acme.com", "en-US", "UTC", "#000", "logo");

        tenant.PrimaryDomain.Should().Be("crm.acme.com");
        tenant.Locale.Should().Be("en-US");
        tenant.TimeZone.Should().Be("UTC");
    }
}
