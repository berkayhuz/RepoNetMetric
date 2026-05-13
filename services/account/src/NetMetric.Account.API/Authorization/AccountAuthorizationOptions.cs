namespace NetMetric.Account.Api.Authorization;

public sealed class AccountAuthorizationOptions
{
    public const string SectionName = "Authorization";

    public bool RequireTenantClaim { get; init; } = true;
    public string RequiredPermissionClaimType { get; init; } = "permission";
    public string RequiredTenantClaimType { get; init; } = "tenant_id";
}
