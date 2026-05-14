using FluentAssertions;
using NetMetric.CRM.DocumentManagement.Domain.Entities.DocumentRecords;

namespace NetMetric.CRM.DocumentManagement.UnitTests;

public sealed class DocumentRecordTests
{
    [Fact]
    public void Create_Should_Set_Name()
    {
        var entity = DocumentRecord.Create("Sample");

        entity.Name.Should().Be("Sample");
        entity.Id.Should().NotBeEmpty();
    }
}
