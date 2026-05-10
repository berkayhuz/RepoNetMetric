namespace NetMetric.AspNetCore.Security;

public sealed record SecurityHeadersValues(
    string ContentSecurityPolicy,
    string ReferrerPolicy,
    string PermissionsPolicy,
    bool EnableHsts,
    int HstsMaxAgeSeconds,
    bool PreloadHsts,
    bool IncludeSubDomains,
    bool DisableResponseCaching);
