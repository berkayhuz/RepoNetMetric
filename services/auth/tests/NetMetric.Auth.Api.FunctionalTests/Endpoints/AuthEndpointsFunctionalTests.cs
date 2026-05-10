using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NetMetric.Auth.Application.Exceptions;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Contracts.Requests;
using NetMetric.Auth.Contracts.Responses;
using NetMetric.Auth.TestKit.Builders;
using NetMetric.Auth.TestKit.Extensions;
using NetMetric.Auth.TestKit.Fixtures;
using NetMetric.Auth.TestKit.Helpers;

namespace NetMetric.Auth.Api.FunctionalTests.Endpoints;

public sealed class AuthEndpointsFunctionalTests : IAsyncLifetime
{
    private readonly AuthWebApplicationFactory _factory = new();
    private HttpClient _client = default!;

    public async Task InitializeAsync()
    {
        await _factory.InitializeAsync();
        _client = _factory.CreateClient();
    }

    public async Task DisposeAsync()
    {
        await _factory.DisposeAsync();
    }

    [Fact]
    public async Task Register_Should_Return_Cookies_With_Secure_Flags()
    {
        _factory.SenderMock.Reset();
        var tokenResponse = AuthTestDataBuilder.TokenResponse();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<RegisterCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(tokenResponse);

        var request = AuthTestDataBuilder.RegisterRequest().Build();

        var response = await _client.PostAsync("/api/auth/register", JsonSerializationHelper.ToJsonContent(request));

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        response.Headers.TryGetValues("Set-Cookie", out var cookies).Should().BeTrue();
        cookies.Should().NotBeNull();
        cookies!.Should().Contain(cookie => cookie.Contains("HttpOnly", StringComparison.OrdinalIgnoreCase));
        cookies.Should().Contain(cookie => cookie.Contains("Secure", StringComparison.OrdinalIgnoreCase));
        cookies.Should().Contain(cookie => cookie.Contains("SameSite=Lax", StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public async Task Login_Should_Return_ProblemDetails_On_Validation_Error()
    {
        _factory.SenderMock.Reset();
        var validationFailures = new[] { new ValidationFailure("Password", "Password is required.") };
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<LoginCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new ValidationException(validationFailures));

        var response = await _client.PostAsync(
            "/api/auth/login",
            JsonSerializationHelper.ToJsonContent(new LoginRequest(Guid.NewGuid(), "jane@example.com", string.Empty)));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest);
        problem["title"]!.GetValue<string>().Should().Be("Validation failed");
        problem["errors"]!["Password"]![0]!.GetValue<string>().Should().Be("Password is required.");
    }

    [Fact]
    public async Task Refresh_Should_Return_ProblemDetails_With_ErrorCode_For_Invalid_RefreshToken()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<RefreshTokenCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new AuthApplicationException(
                "Invalid refresh token",
                "Session could not be refreshed.",
                StatusCodes.Status401Unauthorized,
                errorCode: "invalid_refresh_token"));

        var response = await _client.PostAsync(
            "/api/auth/refresh",
            JsonSerializationHelper.ToJsonContent(new RefreshTokenRequest(Guid.NewGuid(), Guid.NewGuid(), "invalid-token")));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status401Unauthorized, "invalid_refresh_token");
        problem["title"]!.GetValue<string>().Should().Be("Invalid refresh token");
    }

    [Fact]
    public async Task SessionStatus_Should_Require_Authentication()
    {
        var response = await _client.GetAsync("/api/auth/session-status");

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task SessionStatus_Should_Return_NoContent_For_Authenticated_User()
    {
        using var authenticatedClient = _factory.CreateAuthenticatedClient();

        var response = await authenticatedClient.GetAsync("/api/auth/session-status");

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
    }
}
