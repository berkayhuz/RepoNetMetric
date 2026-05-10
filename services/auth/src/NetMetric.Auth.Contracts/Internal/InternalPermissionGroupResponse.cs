namespace NetMetric.Auth.Contracts.Internal;

public sealed record InternalPermissionGroupResponse(string Group, IReadOnlyCollection<string> Permissions);
