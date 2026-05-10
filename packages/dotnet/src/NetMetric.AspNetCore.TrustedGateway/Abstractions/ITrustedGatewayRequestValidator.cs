using Microsoft.AspNetCore.Http;
using NetMetric.AspNetCore.TrustedGateway.Models;

namespace NetMetric.AspNetCore.TrustedGateway.Abstractions;

public interface ITrustedGatewayRequestValidator
{
    Task<TrustedGatewayValidationResult> ValidateAsync(HttpContext context, string correlationId, CancellationToken cancellationToken);
}
