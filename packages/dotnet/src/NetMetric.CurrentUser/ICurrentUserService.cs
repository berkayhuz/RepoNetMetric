namespace NetMetric.CurrentUser;

public interface ICurrentUserService
{
    Guid UserId { get; }
    Guid TenantId { get; }
    bool IsAuthenticated { get; }
    string? UserName { get; }
    string? Email { get; }
    IReadOnlyCollection<string> Roles { get; }
    IReadOnlyCollection<string> Permissions { get; }
    bool IsInRole(string role);
    bool HasPermission(string permission);
}
