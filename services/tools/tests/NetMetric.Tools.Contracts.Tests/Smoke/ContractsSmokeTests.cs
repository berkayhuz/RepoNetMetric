using FluentAssertions;
using NetMetric.Tools.Contracts.Catalog;

namespace NetMetric.Tools.Contracts.Tests.Smoke;

public sealed class ContractsSmokeTests
{
    [Fact]
    public void ToolCategoryResponse_ShouldCreate()
    {
        var response = new ToolCategoryResponse("image", "Image", "desc", 1);
        response.Slug.Should().Be("image");
    }
}
