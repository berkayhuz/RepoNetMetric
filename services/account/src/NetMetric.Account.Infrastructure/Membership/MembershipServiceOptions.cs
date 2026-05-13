namespace NetMetric.Account.Infrastructure.Membership;

public sealed class MembershipServiceOptions
{
    public const string SectionName = "MembershipService";

    public string BaseUrl { get; init; } = string.Empty;
    public string OrganizationsPath { get; init; } = "/api/v1/internal/membership/users/{userId}/organizations";
    public string PermissionsPath { get; init; } = "/api/v1/internal/membership/users/{userId}/permissions";
    public int TimeoutSeconds { get; init; } = 10;
    public bool AllowUnavailableFallback { get; init; }
    public bool SkipRemoteCalls { get; init; }
}
