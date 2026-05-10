using System.ComponentModel.DataAnnotations;

namespace NetMetric.Auth.API.Security;

public sealed class ApiForwardedHeadersOptions
{
    public const string SectionName = "Security:ForwardedHeaders";

    [Range(1, 10)]
    public int ForwardLimit { get; set; } = 2;

    public string[] KnownProxies { get; set; } = [];

    public string[] KnownNetworks { get; set; } = [];
}
