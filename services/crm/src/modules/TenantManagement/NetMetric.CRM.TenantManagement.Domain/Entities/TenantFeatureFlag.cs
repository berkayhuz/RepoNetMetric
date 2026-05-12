using NetMetric.Entities;

namespace NetMetric.CRM.TenantManagement.Domain.Entities;

public sealed class TenantFeatureFlag : EntityBase
{
    public string Key { get; private set; } = null!;
    public bool IsEnabled { get; private set; }
    public DateTime? EffectiveFromUtc { get; private set; }

    private TenantFeatureFlag() { }

    public TenantFeatureFlag(Guid tenantId, string key, bool isEnabled)
    {
        TenantId = tenantId;
        Key = key.Trim();
        IsEnabled = isEnabled;
    }

    public void Toggle(bool isEnabled, DateTime? effectiveFromUtc)
    {
        IsEnabled = isEnabled;
        EffectiveFromUtc = effectiveFromUtc;
    }
}
