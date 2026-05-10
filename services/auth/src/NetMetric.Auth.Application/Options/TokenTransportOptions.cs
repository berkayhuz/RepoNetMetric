namespace NetMetric.Auth.Application.Options;

public static class TokenTransportModes
{
    public const string CookiesOnly = "CookiesOnly";
    public const string BodyOnly = "BodyOnly";
    public const string HybridDevelopment = "HybridDevelopment";
}

public sealed class TokenTransportOptions
{
    public const string SectionName = "Security:TokenTransport";

    public string Mode { get; set; } = TokenTransportModes.CookiesOnly;

    public bool AllowRefreshTokenFromRequestBody { get; set; }

    public bool AllowSessionIdFromRequestBody { get; set; } = true;

    public string AccessCookieName { get; set; } = "__Secure-netmetric-access";

    public string RefreshCookieName { get; set; } = "__Secure-netmetric-refresh";

    public string SessionCookieName { get; set; } = "__Secure-netmetric-session";

    public string SameSite { get; set; } = "Lax";

    public string AccessCookiePath { get; set; } = "/";

    public string RefreshCookiePath { get; set; } = "/api/auth";

    public string SessionCookiePath { get; set; } = "/api/auth";

    public string? CookieDomain { get; set; }
}
