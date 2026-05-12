using NetMetric.Entities;

namespace NetMetric.CRM.TenantManagement.Domain.Entities;

public sealed class TenantModuleToggle : EntityBase
{
    public string ModuleKey { get; private set; } = null!;
    public bool IsEnabled { get; private set; }

    private TenantModuleToggle() { }

    public TenantModuleToggle(Guid tenantId, string moduleKey, bool isEnabled)
    {
        TenantId = tenantId;
        ModuleKey = moduleKey.Trim();
        IsEnabled = isEnabled;
    }

    public void SetEnabled(bool isEnabled) => IsEnabled = isEnabled;
}
