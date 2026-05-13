using FluentAssertions;
using NetMetric.Tools.Domain.ValueObjects;

namespace NetMetric.Tools.Domain.UnitTests.ValueObjects;

public sealed class FileSizeBytesTests
{
    [Fact]
    public void Constructor_ShouldThrow_WhenNotPositive()
    {
        var action = () => new FileSizeBytes(0);
        action.Should().Throw<ArgumentException>();
    }
}
