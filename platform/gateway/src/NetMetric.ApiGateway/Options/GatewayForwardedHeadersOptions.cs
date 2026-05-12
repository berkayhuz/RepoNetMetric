using System.ComponentModel.DataAnnotations;

namespace NetMetric.ApiGateway.Options;

public sealed class GatewayForwardedHeadersOptions
{
    public const string SectionName = "Security:ForwardedHeaders";

    [Range(1, 10)]
    public int ForwardLimit { get; set; } = 2;

    public string[] KnownProxies { get; set; } = [];

    public string[] KnownNetworks { get; set; } = [];
}
