using Microsoft.AspNetCore.Http;
using NetMetric.AspNetCore.TrustedGateway.Models;

namespace NetMetric.AspNetCore.TrustedGateway.Abstractions;

public interface ITrustedGatewaySigner
{
    Task<TrustedGatewaySignedHeaders> SignAsync(HttpRequest request, string correlationId, CancellationToken cancellationToken);
}
