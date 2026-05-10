namespace NetMetric.AspNetCore.TrustedGateway.Models;

public sealed record TrustedGatewayValidationResult(bool Succeeded, TrustedGatewayFailureReason FailureReason, string? ErrorCode = null)
{
    public static TrustedGatewayValidationResult Success() => new(true, TrustedGatewayFailureReason.None);

    public static TrustedGatewayValidationResult Fail(TrustedGatewayFailureReason reason, string code) => new(false, reason, code);
}