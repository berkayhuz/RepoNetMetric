namespace NetMetric.Auth.Contracts.Internal;

public sealed record InternalUpdateTenantMemberRolesRequest(
    Guid ActorUserId,
    IReadOnlyCollection<string> Roles);
