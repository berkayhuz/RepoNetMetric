using System.Threading.RateLimiting;

namespace NetMetric.Auth.API.Security;

public sealed class AuthRateLimitingOptions
{
    public const string SectionName = "Security:RateLimiting";
    public const string LoginPolicyName = "auth-login";
    public const string RegisterPolicyName = "auth-register";
    public const string RefreshPolicyName = "auth-refresh";
    public const string LogoutPolicyName = "auth-logout";
    public const string InvitePolicyName = "auth-invite";
    public const string RoleManagementPolicyName = "auth-role-management";

    public FixedWindowRuleOptions Global { get; set; } = new(PermitLimit: 120, WindowSeconds: 60, QueueLimit: 0);

    public FixedWindowRuleOptions Login { get; set; } = new(PermitLimit: 5, WindowSeconds: 60, QueueLimit: 0);

    public FixedWindowRuleOptions Register { get; set; } = new(PermitLimit: 3, WindowSeconds: 300, QueueLimit: 0);

    public FixedWindowRuleOptions Refresh { get; set; } = new(PermitLimit: 10, WindowSeconds: 60, QueueLimit: 0);

    public FixedWindowRuleOptions Logout { get; set; } = new(PermitLimit: 20, WindowSeconds: 60, QueueLimit: 0);

    public FixedWindowRuleOptions Invite { get; set; } = new(PermitLimit: 10, WindowSeconds: 300, QueueLimit: 0);

    public FixedWindowRuleOptions RoleManagement { get; set; } = new(PermitLimit: 20, WindowSeconds: 300, QueueLimit: 0);
}

public sealed record FixedWindowRuleOptions(int PermitLimit, int WindowSeconds, int QueueLimit)
{
    public FixedWindowRateLimiterOptions ToLimiterOptions() => new()
    {
        PermitLimit = PermitLimit,
        Window = TimeSpan.FromSeconds(WindowSeconds),
        QueueLimit = QueueLimit,
        QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
        AutoReplenishment = true
    };
}
