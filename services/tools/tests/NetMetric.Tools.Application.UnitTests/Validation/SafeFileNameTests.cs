using FluentAssertions;
using NetMetric.Tools.Application.Common;

namespace NetMetric.Tools.Application.UnitTests.Validation;

public sealed class SafeFileNameTests
{
    [Fact]
    public void Normalize_ShouldStripUnsafeSegments()
    {
        var result = SafeFileName.Normalize("..\\../../evil.png");
        result.Should().NotContain("..");
        result.Should().NotContain("\\");
        result.Should().NotContain("/");
    }
}
