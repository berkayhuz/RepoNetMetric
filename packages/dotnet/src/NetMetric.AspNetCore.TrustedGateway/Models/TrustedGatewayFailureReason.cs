namespace NetMetric.AspNetCore.TrustedGateway.Models;

public enum TrustedGatewayFailureReason
{
    None = 0,
    MissingHeaders,
    InvalidSource,
    InvalidKey,
    InvalidTimestamp,
    TimestampSkewExceeded,
    InvalidRemoteAddress,
    InvalidContentHash,
    InvalidSignature,
    ReplayDetected
}
