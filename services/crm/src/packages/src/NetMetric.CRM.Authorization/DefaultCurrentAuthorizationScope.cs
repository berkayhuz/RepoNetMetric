namespace NetMetric.CRM.Authorization;

public sealed class DefaultCurrentAuthorizationScope(ICurrentUserService currentUserService) : ICurrentAuthorizationScope
{
    public AuthorizationScope Resolve(string resource)
    {
        currentUserService.EnsureAuthenticated();
        var tenantId = currentUserService.EnsureTenant();
        var permissions = currentUserService.Permissions;

        var rowAccessLevel =
            CrmAuthorizationCatalog.HasPermission(permissions, CrmAuthorizationCatalog.WildcardPermission) ||
            CrmAuthorizationCatalog.HasPermission(permissions, $"{resource}.manage") ||
            CrmAuthorizationCatalog.HasPermission(permissions, $"{resource}.read")
                ? RowAccessLevel.Tenant
                : CrmAuthorizationCatalog.HasPermission(permissions, $"{resource}.assigned.read")
                    ? RowAccessLevel.Assigned
                    : RowAccessLevel.Own;

        return new AuthorizationScope(tenantId, currentUserService.UserId, resource, rowAccessLevel, permissions);
    }
}
