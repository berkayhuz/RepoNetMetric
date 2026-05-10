namespace NetMetric.Auth.Contracts.IntegrationEvents;

public sealed record AuthEmailConfirmationRequestedV1(
    Guid UserId,
    Guid TenantId,
    string UserName,
    string Email,
    string Token,
    string ConfirmationUrl,
    DateTime ExpiresAtUtc,
    string? Culture = null)
{
    public const string EventName = "auth.email.confirmation-requested";
    public const int EventVersion = 1;
    public const string RoutingKey = "auth.email.confirmation-requested.v1";
}
