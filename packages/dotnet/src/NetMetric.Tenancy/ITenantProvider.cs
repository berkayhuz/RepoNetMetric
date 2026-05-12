namespace NetMetric.Tenancy;

public interface ITenantProvider
{
    Guid? TenantId { get; }
}
