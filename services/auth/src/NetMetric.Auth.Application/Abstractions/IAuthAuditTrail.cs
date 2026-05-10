using NetMetric.Auth.Application.Records;

namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthAuditTrail
{
    Task WriteAsync(AuthAuditRecord record, CancellationToken cancellationToken);
}
