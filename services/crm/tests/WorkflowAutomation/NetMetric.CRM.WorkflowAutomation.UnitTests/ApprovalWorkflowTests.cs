using FluentAssertions;
using NetMetric.CRM.WorkflowAutomation.Domain.Entities.ApprovalWorkflows;

namespace NetMetric.CRM.WorkflowAutomation.UnitTests;

public sealed class ApprovalWorkflowTests
{
    [Fact]
    public void Create_Should_Set_Name()
    {
        var entity = ApprovalWorkflow.Create("Sample", "customer");

        entity.Name.Should().Be("Sample");
        entity.EntityType.Should().Be("customer");
        entity.Id.Should().NotBeEmpty();
    }
}
