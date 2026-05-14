using FluentAssertions;
using NetMetric.CRM.IntegrationHub.Domain.Entities;

namespace NetMetric.CRM.IntegrationHub.UnitTests;

public sealed class ProviderCredentialTests
{
    [Fact]
    public void Constructor_Should_Create_Endpoint_Key_And_Enable_Credential()
    {
        var credential = new ProviderCredential(
            Guid.NewGuid(),
            "mock",
            "Mock Provider",
            "access-token-123",
            "signing-secret-123");

        credential.EndpointKey.Should().StartWith("ep_");
        credential.IsEnabled.Should().BeTrue();
        credential.ProviderKey.Should().Be("mock");
    }

    [Fact]
    public void Reconfigure_Should_Update_Values()
    {
        var credential = new ProviderCredential(
            Guid.NewGuid(),
            "mock",
            "Mock Provider",
            "access-token-123",
            "signing-secret-123");

        credential.Reconfigure("Updated Mock", "access-token-456", "signing-secret-456", false);

        credential.DisplayName.Should().Be("Updated Mock");
        credential.AccessToken.Should().Be("access-token-456");
        credential.WebhookSigningSecret.Should().Be("signing-secret-456");
        credential.IsEnabled.Should().BeFalse();
    }
}

