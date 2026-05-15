// <copyright file="ProviderCatalogAndValidationTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

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

        var result = tester.Test(new ProviderValidationInput("mock", "Mock", "mock_access_token_sample_123", "mock_signing_secret_sample_1234", null));

        result.Succeeded.Should().BeTrue();
        result.Code.Should().Be("mock_connection_ok");
    }

    [Fact]
    public void WhatsApp_TestConnection_Should_Return_AdapterNotActive()
    {
        var catalog = new DefaultIntegrationProviderCatalog();
        var validator = new DefaultProviderCredentialValidator(catalog);
        var tester = new DefaultProviderConnectionTester(catalog, validator, Options.Create(new WhatsAppProviderOptions()));

        var result = tester.Test(new ProviderValidationInput("whatsapp", "WA", "whatsapp_mock_token_sample_123456", "whatsapp_signing_secret_sample_123456", "{\"verifyToken\":\"verify_token_sample_123456\"}"));

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
