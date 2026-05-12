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
    public async Task Register_Should_Return_ProblemDetails_For_Registration_Conflict()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<RegisterCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new AuthApplicationException(
                "Registration could not be completed",
                "The registration request could not be completed with the supplied identity.",
                StatusCodes.Status409Conflict,
                errorCode: "registration_conflict"));

        var response = await _client.PostAsync(
            "/api/auth/register",
            JsonSerializationHelper.ToJsonContent(AuthTestDataBuilder.RegisterRequest().Build()));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status409Conflict, "registration_conflict");
        problem["title"]!.GetValue<string>().Should().Be("Registration could not be completed");
    }

    [Fact]
    public async Task ConfirmEmail_Should_Return_NoContent_On_Success()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ConfirmEmailCommand>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var response = await _client.PostAsync(
            "/api/auth/confirm-email",
            JsonSerializationHelper.ToJsonContent(new ConfirmEmailRequest(Guid.NewGuid(), Guid.NewGuid(), "confirm-token")));

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
    }

    [Fact]
    public async Task ConfirmEmail_Should_Return_ProblemDetails_For_Invalid_Token()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ConfirmEmailCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new AuthApplicationException(
                "Invalid token",
                "The supplied email confirmation token is invalid or expired.",
                StatusCodes.Status400BadRequest,
                errorCode: "invalid_email_confirmation_token"));

        var response = await _client.PostAsync(
            "/api/auth/confirm-email",
            JsonSerializationHelper.ToJsonContent(new ConfirmEmailRequest(Guid.NewGuid(), Guid.NewGuid(), "invalid-token")));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest, "invalid_email_confirmation_token");
        problem["title"]!.GetValue<string>().Should().Be("Invalid token");
    }

    [Fact]
    public async Task ConfirmEmail_Should_Return_ProblemDetails_On_Validation_Error()
    {
        _factory.SenderMock.Reset();
        var validationFailures = new[] { new ValidationFailure("Token", "Token is required.") };
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ConfirmEmailCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new ValidationException(validationFailures));

        var response = await _client.PostAsync(
            "/api/auth/confirm-email",
            JsonSerializationHelper.ToJsonContent(new ConfirmEmailRequest(Guid.NewGuid(), Guid.NewGuid(), string.Empty)));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest);
        problem["title"]!.GetValue<string>().Should().Be("Validation failed");
        problem["errors"]!["Token"]![0]!.GetValue<string>().Should().Be("Token is required.");
    }

    [Fact]
    public async Task ForgotPassword_Should_Return_Accepted_On_Success()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ForgotPasswordCommand>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var response = await _client.PostAsync(
            "/api/auth/forgot-password",
            JsonSerializationHelper.ToJsonContent(new ForgotPasswordRequest(Guid.NewGuid(), "jane@example.com")));

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Accepted);
    }

    [Fact]
    public async Task ForgotPassword_Should_Return_ProblemDetails_On_Validation_Error()
    {
        _factory.SenderMock.Reset();
        var validationFailures = new[] { new ValidationFailure("Email", "Email is required.") };
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ForgotPasswordCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new ValidationException(validationFailures));

        var response = await _client.PostAsync(
            "/api/auth/forgot-password",
            JsonSerializationHelper.ToJsonContent(new ForgotPasswordRequest(Guid.NewGuid(), string.Empty)));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest);
        problem["title"]!.GetValue<string>().Should().Be("Validation failed");
        problem["errors"]!["Email"]![0]!.GetValue<string>().Should().Be("Email is required.");
    }

    [Fact]
    public async Task ResetPassword_Should_Return_NoContent_On_Success()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ResetPasswordCommand>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var response = await _client.PostAsync(
            "/api/auth/reset-password",
            JsonSerializationHelper.ToJsonContent(
                new ResetPasswordRequest(Guid.NewGuid(), Guid.NewGuid(), "reset-token", "Str0ng!Pass123")));

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
    }

    [Fact]
    public async Task ResetPassword_Should_Return_ProblemDetails_For_Invalid_Token()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ResetPasswordCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new AuthApplicationException(
                "Invalid token",
                "The supplied password reset token is invalid or expired.",
                StatusCodes.Status400BadRequest,
                errorCode: "invalid_password_reset_token"));

        var response = await _client.PostAsync(
            "/api/auth/reset-password",
            JsonSerializationHelper.ToJsonContent(
                new ResetPasswordRequest(Guid.NewGuid(), Guid.NewGuid(), "invalid-token", "Str0ng!Pass123")));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest, "invalid_password_reset_token");
        problem["title"]!.GetValue<string>().Should().Be("Invalid token");
    }

    [Fact]
    public async Task ResetPassword_Should_Return_ProblemDetails_On_Validation_Error()
    {
        _factory.SenderMock.Reset();
        var validationFailures = new[] { new ValidationFailure("NewPassword", "Password is required.") };
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<ResetPasswordCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new ValidationException(validationFailures));

        var response = await _client.PostAsync(
            "/api/auth/reset-password",
            JsonSerializationHelper.ToJsonContent(
                new ResetPasswordRequest(Guid.NewGuid(), Guid.NewGuid(), "token", string.Empty)));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status400BadRequest);
        problem["title"]!.GetValue<string>().Should().Be("Validation failed");
        problem["errors"]!["NewPassword"]![0]!.GetValue<string>().Should().Be("Password is required.");
    }

    [Fact]
    public async Task Login_Should_Return_Cookies_With_Secure_Flags()
    {
        _factory.SenderMock.Reset();
        var tokenResponse = AuthTestDataBuilder.TokenResponse();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<LoginCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(tokenResponse);

        var request = AuthTestDataBuilder.LoginRequest().Build();

        var response = await _client.PostAsync("/api/auth/login", JsonSerializationHelper.ToJsonContent(request));

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
    public async Task Login_Should_Return_ProblemDetails_For_Mfa_Required()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<LoginCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new AuthApplicationException(
                "Second factor required",
                "Multi-factor authentication challenge is required for this account.",
                StatusCodes.Status401Unauthorized,
                errorCode: "mfa_required"));

        var response = await _client.PostAsync(
            "/api/auth/login",
            JsonSerializationHelper.ToJsonContent(new LoginRequest(Guid.NewGuid(), "jane@example.com", "Password123!")));

        var problem = await response.ShouldBeProblemDetailsAsync(StatusCodes.Status401Unauthorized, "mfa_required");
        problem["title"]!.GetValue<string>().Should().Be("Second factor required");
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
    public async Task Refresh_Should_Use_Cookie_Refresh_Context_When_TokenTransport_Is_CookiesOnly()
    {
        _factory.SenderMock.Reset();
        var tenantId = Guid.NewGuid();
        var cookieSessionId = Guid.NewGuid();
        const string cookieRefreshToken = "cookie-refresh-token";
        var bodySessionId = Guid.NewGuid();
        const string bodyRefreshToken = "body-refresh-token";
        RefreshTokenCommand? capturedCommand = null;

        _factory.SenderMock
            .Setup(sender => sender.Send(
                It.Is<IRequest<AuthenticationTokenResponse>>(command => command is RefreshTokenCommand),
                It.IsAny<CancellationToken>()))
            .Callback<IRequest<AuthenticationTokenResponse>, CancellationToken>((command, _) => capturedCommand = (RefreshTokenCommand)command)
            .ReturnsAsync(AuthTestDataBuilder.TokenResponse(tenantId: tenantId));

        using var request = new HttpRequestMessage(HttpMethod.Post, "/api/auth/refresh")
        {
            Content = JsonSerializationHelper.ToJsonContent(new RefreshTokenRequest(tenantId, bodySessionId, bodyRefreshToken))
        };
        request.Headers.Add("Origin", "https://localhost:7025");
        request.Headers.Add("Cookie", $"__Secure-netmetric-refresh={cookieRefreshToken}; __Secure-netmetric-session={cookieSessionId:D}");

        var response = await _client.SendAsync(request);

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        capturedCommand.Should().NotBeNull();
        capturedCommand!.SessionId.Should().Be(cookieSessionId);
        capturedCommand.RefreshToken.Should().Be(cookieRefreshToken);
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
