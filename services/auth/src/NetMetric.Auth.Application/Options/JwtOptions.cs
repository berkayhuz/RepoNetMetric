namespace NetMetric.Auth.Application.Options;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = null!;
    public string Audience { get; set; } = null!;
    public int AccessTokenMinutes { get; set; } = 15;
    public int RefreshTokenDays { get; set; } = 14;
    public JwtSigningKeyOptions[] SigningKeys { get; set; } = [];
}

public sealed class JwtSigningKeyOptions
{
    public string KeyId { get; set; } = null!;
    public bool IsCurrent { get; set; }
    public string? PrivateKeyPath { get; set; }
    public string PrivateKeyPem { get; set; } = null!;
}
