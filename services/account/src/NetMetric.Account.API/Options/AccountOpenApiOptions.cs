namespace NetMetric.Account.Api.Options;

public sealed class AccountOpenApiOptions
{
    public const string SectionName = "OpenApi";

    public string Title { get; init; } = "NetMetric Account API";
    public string Version { get; init; } = "v1";
}
