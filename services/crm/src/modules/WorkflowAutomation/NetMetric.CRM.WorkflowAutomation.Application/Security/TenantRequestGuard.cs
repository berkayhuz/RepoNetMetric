using NetMetric.Tenancy;

namespace NetMetric.CRM.WorkflowAutomation.Application.Security;

public static class TenantRequestGuard
{
    public static Guid Resolve(ITenantContext tenantContext, Guid requestedTenantId)
    {
        var currentTenantId = tenantContext.GetRequiredTenantId();

        if (requestedTenantId != Guid.Empty && requestedTenantId != currentTenantId)
        {
            throw new UnauthorizedAccessException("The requested tenant does not match the authenticated tenant context.");
        }

        return currentTenantId;
    }
}
