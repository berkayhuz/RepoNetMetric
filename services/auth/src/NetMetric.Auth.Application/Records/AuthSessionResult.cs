using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Records;

public abstract record AuthSessionResult
{
    private AuthSessionResult()
    {
    }

    public sealed record Issued(AuthenticationTokenResponse Tokens) : AuthSessionResult;

    public sealed record PendingConfirmation(Guid TenantId, Guid UserId, string Email) : AuthSessionResult;
}
