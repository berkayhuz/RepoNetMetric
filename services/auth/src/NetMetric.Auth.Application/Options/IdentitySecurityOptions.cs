namespace NetMetric.Auth.Application.Options;

public sealed class IdentitySecurityOptions
{
    public const string SectionName = "IdentitySecurity";

    public int MaxFailedAccessAttempts { get; set; } = 5;
    public int LockoutMinutes { get; set; } = 15;
    public List<Guid> AllowedPublicTenantIds { get; set; } = [];
}