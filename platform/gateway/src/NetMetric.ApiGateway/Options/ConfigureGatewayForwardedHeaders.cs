using Microsoft.Extensions.Options;
using NetMetric.AspNetCore.Security;

namespace NetMetric.ApiGateway.Options;

public sealed class ConfigureGatewayForwardedHeaders(IOptions<GatewayForwardedHeadersOptions> options)
    : IConfigureOptions<ForwardedHeadersOptions>
{
    public void Configure(ForwardedHeadersOptions forwardedHeadersOptions)
    {
        var value = options.Value;
        SecuritySupport.ConfigureForwardedHeaders(
            forwardedHeadersOptions,
            value.ForwardLimit,
            value.KnownProxies,
            value.KnownNetworks);
    }
}
