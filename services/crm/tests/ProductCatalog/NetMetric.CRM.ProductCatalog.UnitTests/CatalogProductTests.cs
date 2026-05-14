using FluentAssertions;
using NetMetric.CRM.ProductCatalog.Domain.Entities.Products;

namespace NetMetric.CRM.ProductCatalog.UnitTests;

public sealed class CatalogProductTests
{
    [Fact]
    public void Constructor_Should_Set_Required_Fields()
    {
        var entity = new CatalogProduct("CODE-1", "Name 1", "Desc");
        entity.Code.Should().Be("CODE-1");
        entity.Name.Should().Be("Name 1");
        entity.Description.Should().Be("Desc");
        entity.IsActive.Should().BeTrue();
    }
}
