using Microsoft.Extensions.Options;
using NetMetric.AspNetCore.Security;

namespace NetMetric.Auth.API.Security;

public sealed class ConfigureApiForwardedHeaders(IOptions<ApiForwardedHeadersOptions> options)
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
