using FluentAssertions;
using NetMetric.CRM.MarketingAutomation.Domain.Entities.Campaigns;

namespace NetMetric.CRM.MarketingAutomation.UnitTests;

public sealed class CampaignTests
{
    [Fact]
    public void Constructor_Should_Set_Required_Fields()
    {
        var entity = new Campaign("CODE-1", "Name 1", "Desc");
        entity.Code.Should().Be("CODE-1");
        entity.Name.Should().Be("Name 1");
        entity.Description.Should().Be("Desc");
        entity.IsActive.Should().BeTrue();
    }
}
