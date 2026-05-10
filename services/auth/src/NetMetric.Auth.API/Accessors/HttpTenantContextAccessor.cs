using NetMetric.Auth.API.Middlewares;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Records;

namespace NetMetric.Auth.API.Accessors;

public sealed class HttpTenantContextAccessor(IHttpContextAccessor httpContextAccessor) : ITenantContextAccessor
{
    public TenantContext? Current => httpContextAccessor.HttpContext is null
        ? null
        : TenantResolutionMiddleware.GetTenantContext(httpContextAccessor.HttpContext);
}
