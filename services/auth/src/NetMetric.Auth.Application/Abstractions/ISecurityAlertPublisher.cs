using NetMetric.Auth.Application.Records;

namespace NetMetric.Auth.Application.Abstractions;

public interface ISecurityAlertPublisher
{
    Task PublishAsync(SecurityAlert alert, CancellationToken cancellationToken);
}
