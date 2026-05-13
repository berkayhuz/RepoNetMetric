using FluentAssertions;
using NetMetric.Tools.Domain.ValueObjects;

namespace NetMetric.Tools.Domain.UnitTests.ValueObjects;

public sealed class ToolSlugTests
{
    [Fact]
    public void Constructor_ShouldNormalize_ValidSlug()
    {
        var slug = new ToolSlug("PNG-To-JPG");
        slug.Value.Should().Be("png-to-jpg");
    }

    [Fact]
    public void Constructor_ShouldThrow_ForInvalidSlug()
    {
        var action = () => new ToolSlug("bad slug");
        action.Should().Throw<ArgumentException>();
    }
}
