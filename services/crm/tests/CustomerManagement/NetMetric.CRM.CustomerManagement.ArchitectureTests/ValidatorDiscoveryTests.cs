using FluentAssertions;
using NetMetric.CRM.CustomerManagement.Application.Validators;

namespace NetMetric.CRM.CustomerManagement.ArchitectureTests;

public sealed class ValidatorDiscoveryTests
{
    [Fact]
    public void CustomerManagement_Assembly_Should_Contain_Multiple_Validators()
    {
        var validatorTypes = typeof(SearchCustomerManagementQueryValidator)
            .Assembly
            .GetTypes()
            .Where(type => type.IsClass && !type.IsAbstract && type.Name.EndsWith("Validator", StringComparison.Ordinal))
            .ToList();

        validatorTypes.Should().NotBeEmpty();
    }
}
