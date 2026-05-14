using FluentAssertions;
using Microsoft.Extensions.Options;
using NetMetric.CRM.IntegrationHub.Application.Abstractions.Providers;
using NetMetric.CRM.IntegrationHub.Infrastructure.Providers;

namespace NetMetric.CRM.IntegrationHub.UnitTests;

public sealed class ProviderCatalogAndValidationTests
{
    [Fact]
    public void Catalog_Should_Contain_Mock_Whatsapp_Instagram()
    {
        var catalog = new DefaultIntegrationProviderCatalog();

        var providers = catalog.List();
        providers.Select(x => x.ProviderKey).Should().Contain(["mock", "whatsapp", "instagram"]);
    }

    [Fact]
    public void Mock_TestConnection_Should_Succeed()
    {
        var catalog = new DefaultIntegrationProviderCatalog();
        var validator = new DefaultProviderCredentialValidator(catalog);
        var tester = new DefaultProviderConnectionTester(catalog, validator, Options.Create(new WhatsAppProviderOptions()));

        var result = tester.Test(new ProviderValidationInput("mock", "Mock", "mock-access-token-123", "mock-signing-secret-1234", null));

        result.Succeeded.Should().BeTrue();
        result.Code.Should().Be("mock_connection_ok");
    }

    [Fact]
    public void WhatsApp_TestConnection_Should_Return_AdapterNotActive()
    {
        var catalog = new DefaultIntegrationProviderCatalog();
        var validator = new DefaultProviderCredentialValidator(catalog);
        var tester = new DefaultProviderConnectionTester(catalog, validator, Options.Create(new WhatsAppProviderOptions()));

        var result = tester.Test(new ProviderValidationInput("whatsapp", "WA", "EAAG-token-123456", "signing-secret-123456", "{\"verifyToken\":\"verify-token-123456\"}"));

        result.Succeeded.Should().BeFalse();
        result.Code.Should().Be("missing_required_fields");
    }

    [Fact]
    public void Missing_Required_Fields_Should_Fail_Validation()
    {
        var catalog = new DefaultIntegrationProviderCatalog();
        var validator = new DefaultProviderCredentialValidator(catalog);

        var result = validator.Validate(new ProviderValidationInput("mock", "Mock", "", "", null));

        result.IsValid.Should().BeFalse();
        result.Code.Should().NotBeNullOrWhiteSpace();
    }
}
