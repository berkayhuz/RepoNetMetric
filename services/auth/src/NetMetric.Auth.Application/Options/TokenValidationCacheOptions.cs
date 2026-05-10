namespace NetMetric.Auth.Application.Options;

public sealed class TokenValidationCacheOptions
{
    public const string SectionName = "Security:TokenValidationCache";

    public bool EnableCache { get; set; } = true;

    public int AbsoluteExpirationSeconds { get; set; } = 30;

    public int NegativeAbsoluteExpirationSeconds { get; set; } = 10;

    public string KeyPrefix { get; set; } = "auth:user-token-state";
}
