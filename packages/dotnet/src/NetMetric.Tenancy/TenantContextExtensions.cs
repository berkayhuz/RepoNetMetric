namespace NetMetric.Tenancy;

public static class TenantContextExtensions
{
    public static Guid GetRequiredTenantId(this ITenantContext tenantContext)
        => tenantContext.TenantId
            ?? throw new InvalidOperationException("A tenant context is required.");
}
