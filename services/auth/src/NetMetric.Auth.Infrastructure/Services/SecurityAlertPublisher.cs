using System.Text.Json;
using Microsoft.Extensions.Logging;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Options;
using Microsoft.Extensions.Options;
using NetMetric.Auth.Application.Records;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class SecurityAlertPublisher(
    ILogger<SecurityAlertPublisher> logger,
    IOptions<SecurityAlertOptions> options) : ISecurityAlertPublisher
{
    public Task PublishAsync(SecurityAlert alert, CancellationToken cancellationToken)
    {
        if (!options.Value.EnableStructuredAlerts)
        {
            return Task.CompletedTask;
        }

        logger.LogWarning(
            "SECURITY_ALERT {Category} {Severity} Tenant={TenantId} User={UserId} Session={SessionId} CorrelationId={CorrelationId} TraceId={TraceId} Payload={Payload}",
            alert.Category,
            alert.Severity,
            alert.TenantId,
            alert.UserId,
            alert.SessionId,
            alert.CorrelationId,
            alert.TraceId,
            JsonSerializer.Serialize(alert));

        return Task.CompletedTask;
    }
}
