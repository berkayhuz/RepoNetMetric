// <copyright file="AuthSecurityFunctionalTests.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using FluentAssertions;
using MediatR;
using Moq;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Contracts.Requests;
using NetMetric.Auth.TestKit.Builders;
using NetMetric.Auth.TestKit.Extensions;
using NetMetric.Auth.TestKit.Fixtures;
using NetMetric.Auth.TestKit.Helpers;

namespace NetMetric.Auth.Api.FunctionalTests.Security;

public sealed class AuthSecurityFunctionalTests : IAsyncLifetime
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
    public async Task Cors_Preflight_Should_Allow_Configured_Origin()
    {
        using var request = new HttpRequestMessage(HttpMethod.Options, "/api/auth/login");
        request.Headers.Add("Origin", "https://localhost:7025");
        request.Headers.Add("Access-Control-Request-Method", "POST");

        var response = await _client.SendAsync(request);

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NoContent);
        response.Headers.TryGetValues("Access-Control-Allow-Origin", out var origins).Should().BeTrue();
        origins.Should().ContainSingle().Which.Should().Be("https://localhost:7025");
    }

    [Fact]
    public async Task Login_Should_Return_TooManyRequests_When_RateLimit_Is_Exceeded()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<LoginCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(AuthTestDataBuilder.TokenResponse());

        var request = AuthTestDataBuilder.LoginRequest().Build();
        var responses = new List<HttpResponseMessage>();
        for (var attempt = 0; attempt < 6; attempt++)
        {
            responses.Add(await _client.PostAsync("/api/auth/login", JsonSerializationHelper.ToJsonContent(request)));
        }

        responses.Take(5).Should().OnlyContain(response => response.StatusCode == System.Net.HttpStatusCode.OK);
        var throttledResponse = responses.Last();
        var problem = await throttledResponse.ShouldBeProblemDetailsAsync(StatusCodes.Status429TooManyRequests, "auth_rate_limit_exceeded");
        problem["title"]!.GetValue<string>().Should().Be("Rate limit exceeded");
    }

    [Fact]
    public async Task Unsafe_Cookie_Request_Should_Be_Rejected_Without_Allowed_Origin()
    {
        _factory.SenderMock.Reset();
        _factory.SenderMock
            .Setup(sender => sender.Send(It.IsAny<LogoutCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Unit.Value);

        using var request = new HttpRequestMessage(HttpMethod.Post, "/api/auth/logout")
        {
            Content = JsonSerializationHelper.ToJsonContent(new LogoutRequest(Guid.NewGuid(), Guid.NewGuid(), "token"))
        };
        request.Headers.Add("Cookie", "__Secure-netmetric-access=abc; __Secure-netmetric-refresh=def; __Secure-netmetric-session=ghi");

        var response = await _client.SendAsync(request);

        await response.ShouldBeProblemDetailsAsync(StatusCodes.Status403Forbidden, "cookie_origin_validation_failed");
    }

    [Fact]
    public async Task Security_Headers_Should_Be_Applied_On_Responses()
    {
        var response = await _client.GetAsync("/health/live");

        response.Headers.Contains("Content-Security-Policy").Should().BeTrue();
        response.Headers.Contains("Referrer-Policy").Should().BeTrue();
        response.Headers.Contains("Permissions-Policy").Should().BeTrue();
    }
}
