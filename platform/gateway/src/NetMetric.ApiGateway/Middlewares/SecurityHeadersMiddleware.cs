using Microsoft.Extensions.Options;
using NetMetric.ApiGateway.Options;
using NetMetric.AspNetCore.Security;

namespace NetMetric.ApiGateway.Middlewares;

public sealed class SecurityHeadersMiddleware(RequestDelegate next, IOptions<GatewaySecurityHeadersOptions> options)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var value = options.Value;
        SecuritySupport.ApplySecurityHeaders(
            context,
            new SecurityHeadersValues(
                value.ContentSecurityPolicy,
                value.ReferrerPolicy,
                value.PermissionsPolicy,
                value.EnableHsts,
                value.HstsMaxAgeSeconds,
                value.PreloadHsts,
                value.IncludeSubDomains,
                DisableResponseCaching: false));

        await next(context);
    }
}
