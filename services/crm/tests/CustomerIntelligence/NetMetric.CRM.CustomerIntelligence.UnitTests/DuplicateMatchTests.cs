using FluentAssertions;
using NetMetric.CRM.CustomerIntelligence.Domain.Entities.DuplicateMatchs;

namespace NetMetric.CRM.CustomerIntelligence.UnitTests;

public sealed class DuplicateMatchTests
{
    [Fact]
    public void Create_Should_Set_Name()
    {
        var entity = DuplicateMatch.Create("Sample");

        entity.Name.Should().Be("Sample");
        entity.Id.Should().NotBeEmpty();
    }
}
