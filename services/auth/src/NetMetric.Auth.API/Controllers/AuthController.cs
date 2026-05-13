using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NetMetric.Auth.API.Accessors;
using NetMetric.Auth.API.Cookies;
using NetMetric.Auth.API.Security;
using NetMetric.Auth.Application.Features.Commands;
using NetMetric.Auth.Application.Records;
using NetMetric.Auth.Contracts.Requests;
using NetMetric.Auth.Contracts.Responses;
using NetMetric.Localization;

namespace NetMetric.Auth.API.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    ISender sender,
    AuthRequestContextAccessor requestContextAccessor,
    AuthCookieService cookieService) : ControllerBase
{
    private static readonly AccountActionAcceptedResponse AccountActionAccepted = new(
        "If the request can be completed, instructions will be sent.");

    [HttpPost("register")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.RegisterPolicyName)]
    [ProducesResponseType<AuthenticationTokenResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AccountActionAcceptedResponse>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        var response = await sender.Send(
            new RegisterCommand(
                request.TenantName,
                request.UserName,
                request.Email,
                request.Password,
                request.FirstName,
                request.LastName,
                NetMetricCultures.NormalizeOrDefault(request.Culture ?? HttpContext.Features.Get<Microsoft.AspNetCore.Localization.IRequestCultureFeature>()?.RequestCulture.Culture.Name),
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString()),
            cancellationToken);

        if (response is AuthSessionResult.PendingConfirmation)
        {
            return Accepted(AccountActionAccepted);
        }

        var issued = (AuthSessionResult.Issued)response;
        cookieService.Apply(Response, issued.Tokens);
        return Ok(cookieService.CreateResponsePayload(issued.Tokens));
    }

    [HttpPost("workspaces")]
    [Authorize(Policy = AuthAuthorizationPolicies.TenantUser)]
    [ProducesResponseType<AuthenticationTokenResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateWorkspace([FromBody] CreateWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var principal = requestContextAccessor.GetPrincipalContext(User);
        var response = await sender.Send(
            new CreateWorkspaceCommand(
                principal.TenantId,
                principal.UserId,
                request.Name,
                NetMetricCultures.NormalizeOrDefault(request.Culture ?? HttpContext.Features.Get<Microsoft.AspNetCore.Localization.IRequestCultureFeature>()?.RequestCulture.Culture.Name),
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        cookieService.Apply(Response, response);
        return Ok(cookieService.CreateResponsePayload(response));
    }

    [HttpPost("workspaces/switch")]
    [Authorize(Policy = AuthAuthorizationPolicies.TenantUser)]
    [ProducesResponseType<AuthenticationTokenResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> SwitchWorkspace([FromBody] SwitchWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var principal = requestContextAccessor.GetPrincipalContext(User);
        var response = await sender.Send(
            new SwitchWorkspaceCommand(
                principal.TenantId,
                request.TenantId,
                principal.UserId,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        cookieService.Apply(Response, response);
        return Ok(cookieService.CreateResponsePayload(response));
    }

    [HttpPost("invitations/accept")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.RegisterPolicyName)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AccountActionAcceptedResponse>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> AcceptInvitation([FromBody] AcceptTenantInvitationRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        var response = await sender.Send(
            new AcceptTenantInvitationCommand(
                tenantId,
                request.Token,
                request.UserName,
                request.Email,
                request.Password,
                request.FirstName,
                request.LastName,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        if (response is AuthSessionResult.PendingConfirmation)
        {
            return Accepted(AccountActionAccepted);
        }

        var issued = (AuthSessionResult.Issued)response;
        cookieService.Apply(Response, issued.Tokens);
        return Ok(cookieService.CreateResponsePayload(issued.Tokens));
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType<AuthenticationTokenResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var requestedTenantId = request.TenantId ?? Guid.Empty;
        var tenantId = requestedTenantId == Guid.Empty
            ? Guid.Empty
            : requestContextAccessor.ResolveTenantId(requestedTenantId);
        var response = await sender.Send(
            new LoginCommand(
                tenantId,
                request.EmailOrUserName,
                request.Password,
                request.MfaCode,
                request.RecoveryCode,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString()),
            cancellationToken);

        cookieService.Apply(Response, response);
        return Ok(cookieService.CreateResponsePayload(response));
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType<AccountActionAcceptedResponse>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        await sender.Send(
            new ForgotPasswordCommand(
                tenantId,
                request.Email,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        return Accepted(AccountActionAccepted);
    }

    [HttpPost("reset-password")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        await sender.Send(
            new ResetPasswordCommand(
                tenantId,
                request.UserId,
                request.Token,
                request.NewPassword,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        cookieService.Clear(Response);
        return NoContent();
    }

    [HttpPost("confirm-email")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        await sender.Send(
            new ConfirmEmailCommand(
                tenantId,
                request.UserId,
                request.Token,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("resend-confirm-email")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType<AccountActionAcceptedResponse>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> ResendConfirmEmail([FromBody] ResendEmailConfirmationRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        await sender.Send(
            new ResendEmailConfirmationCommand(
                tenantId,
                request.Email,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        return Accepted(AccountActionAccepted);
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.RefreshPolicyName)]
    [ProducesResponseType<AuthenticationTokenResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<AuthIssuedSessionResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        var refreshContext = requestContextAccessor.ResolveRefreshContext(Request, request.SessionId, request.RefreshToken);

        var response = await sender.Send(
            new RefreshTokenCommand(
                tenantId,
                refreshContext.SessionId,
                refreshContext.RefreshToken,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString()),
            cancellationToken);

        cookieService.Apply(Response, response);
        return Ok(cookieService.CreateResponsePayload(response));
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LogoutPolicyName)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        var refreshContext = requestContextAccessor.ResolveRefreshContext(Request, request.SessionId, request.RefreshToken);

        await sender.Send(new LogoutCommand(tenantId, refreshContext.SessionId, refreshContext.RefreshToken), cancellationToken);
        cookieService.Clear(Response);
        return NoContent();
    }

    [HttpGet("session-status")]
    [Authorize(Policy = AuthAuthorizationPolicies.TenantUser)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult GetSessionStatus()
        => NoContent();

    [HttpPost("confirm-email-change")]
    [AllowAnonymous]
    [EnableRateLimiting(AuthRateLimitingOptions.LoginPolicyName)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ConfirmEmailChange([FromBody] ConfirmEmailChangeRequest request, CancellationToken cancellationToken)
    {
        var tenantId = requestContextAccessor.ResolveTenantId(request.TenantId);
        await sender.Send(
            new ConfirmEmailChangeCommand(
                tenantId,
                request.UserId,
                request.NewEmail,
                request.Token,
                HttpContext.Connection.RemoteIpAddress?.ToString(),
                Request.Headers.UserAgent.ToString(),
                AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(HttpContext),
                HttpContext.TraceIdentifier),
            cancellationToken);

        cookieService.Clear(Response);
        return NoContent();
    }

}
