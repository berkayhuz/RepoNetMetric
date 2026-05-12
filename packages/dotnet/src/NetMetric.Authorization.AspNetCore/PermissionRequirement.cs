using Microsoft.AspNetCore.Authorization;

namespace NetMetric.Authorization.AspNetCore;

public sealed class PermissionRequirement(string permission) : IAuthorizationRequirement
{
    public string Permission { get; } = permission;
}
