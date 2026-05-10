namespace NetMetric.Auth.Application.Options;

public sealed class AuthDataProtectionOptions
{
    public const string SectionName = "Infrastructure:DataProtection";

    public string ApplicationName { get; set; } = "NetMetric.Auth";

    public string? KeyRingPath { get; set; }

    public bool RequirePersistentKeyRingInProduction { get; set; } = true;
}
