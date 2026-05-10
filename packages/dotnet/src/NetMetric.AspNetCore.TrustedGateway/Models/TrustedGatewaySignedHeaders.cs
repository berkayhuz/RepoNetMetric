namespace NetMetric.AspNetCore.TrustedGateway.Models;

public sealed record TrustedGatewaySignedHeaders(
    string Signature,
    string Timestamp,
    string KeyId,
    string Source,
    string Nonce,
    string ContentHash,
    string CorrelationId);