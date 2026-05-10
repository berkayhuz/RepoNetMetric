using FluentAssertions;
using MediatR;
using Moq;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Contracts.Requests;
using NetMetric.Auth.Contracts.Responses;
using NetMetric.Auth.TestKit.Fixtures;
using NetMetric.Auth.TestKit.Helpers;

namespace NetMetric.Auth.Api.FunctionalTests.Security;

[Trait("Category", "SecurityRegression")]
public sealed class TenantResolutionMiddlewareTests : IAsyncLifetime
{
    private readonly Guid _tenantId = Guid.NewGuid();
    private AuthWebApplicationFactory _factory = default!;
    private HttpClient _client = default!;

    public async Task InitializeAsync()
    {
        var overrides = TestConfiguration.CreateAuthApiDefaults();
        overrides["Security:TenantResolution:RequireResolvedTenant"] = "true";
        overrides["Security:TenantResolution:AllowBodyFallback"] = "false";
        overrides["Security:TenantResolution:TenantOptionalPathPrefixes:0"] = "/api/auth/register";

        _factory = new AuthWebApplicationFactory(overrides);
        await _factory.InitializeAsync();
        _client = _factory.CreateClient();
    }

    public async Task DisposeAsync()
    {
        await _factory.DisposeAsync();
    }

    [Fact]
    public async Task Register_Should_Not_Be_Blocked_When_Tenant_Is_Not_Resolved()
    {
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<RegisterCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AuthenticationTokenResponse(
                "access-token",
                DateTime.UtcNow.AddMinutes(15),
                "refresh-token",
                DateTime.UtcNow.AddDays(14),
                _tenantId,
                Guid.NewGuid(),
                "berkay",
                "berkay@example.com",
                Guid.NewGuid()));

        var response = await _client.PostAsync(
            "/api/auth/register",
            JsonSerializationHelper.ToJsonContent(new RegisterRequest("Acme", "berkay", "berkay@example.com", "Str0ng!Pass123", "Berkay", "Test", "en-US")));

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }

    [Fact]
    public async Task Tenant_Required_Endpoint_Should_Be_Blocked_When_Tenant_Is_Not_Resolved()
    {
        var response = await _client.GetAsync("/api/auth/session-status");

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
    }
}
