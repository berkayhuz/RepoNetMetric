namespace NetMetric.Auth.Contracts.Requests;

public sealed record UpdateTenantMemberRolesRequest(IReadOnlyCollection<string> Roles);
