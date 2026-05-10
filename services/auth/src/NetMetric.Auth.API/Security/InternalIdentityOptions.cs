namespace NetMetric.Auth.API.Security;

public sealed class InternalIdentityOptions
{
    public const string SectionName = "Security:InternalIdentity";

    public string[] AllowedSources { get; init; } = ["NetMetric.Account"];
}
