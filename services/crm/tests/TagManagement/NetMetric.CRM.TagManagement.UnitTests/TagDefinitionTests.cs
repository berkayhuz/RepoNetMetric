using FluentAssertions;
using NetMetric.CRM.TagManagement.Domain.Entities.TagDefinitions;

namespace NetMetric.CRM.TagManagement.UnitTests;

public sealed class TagDefinitionTests
{
    [Fact]
    public void Create_Should_Set_Name()
    {
        var entity = TagDefinition.Create("Sample");

        entity.Name.Should().Be("Sample");
        entity.Id.Should().NotBeEmpty();
    }
}
