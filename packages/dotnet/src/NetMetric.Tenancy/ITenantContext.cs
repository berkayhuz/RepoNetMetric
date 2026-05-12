namespace NetMetric.Tenancy;

public interface ITenantContext
{
    Guid? TenantId { get; }
}
