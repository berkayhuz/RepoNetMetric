using NetMetric.Tools.Domain.ValueObjects;

namespace NetMetric.Tools.Application.Abstractions.Security;

public sealed record CurrentUser(Guid UserId, string? CorrelationId, string? IpAddress, string? UserAgent);

public interface ICurrentUserAccessor
{
    CurrentUser GetRequired();
}
