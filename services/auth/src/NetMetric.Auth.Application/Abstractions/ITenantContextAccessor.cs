using NetMetric.Auth.Application.Records;

namespace NetMetric.Auth.Application.Abstractions;

public interface ITenantContextAccessor
{
    TenantContext? Current { get; }
}
