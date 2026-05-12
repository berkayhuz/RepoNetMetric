namespace NetMetric.Authorization;

public sealed record AuthorizationScope(
    Guid TenantId,
    Guid UserId,
    string Resource,
    RowAccessLevel RowAccessLevel,
    IReadOnlyCollection<string> Permissions);
