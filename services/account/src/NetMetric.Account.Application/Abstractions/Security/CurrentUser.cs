namespace NetMetric.Account.Application.Abstractions.Security;

public sealed record CurrentUser(
    Guid TenantId,
    Guid UserId,
    Guid? SessionId,
    DateTimeOffset? AuthenticatedAt,
    IReadOnlyCollection<string> AuthenticationMethods,
    string? CorrelationId,
    string? IpAddress,
    string? UserAgent);

public interface ICurrentUserAccessor
{
    CurrentUser GetRequired();
}
