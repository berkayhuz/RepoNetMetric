namespace NetMetric.Auth.Contracts.Internal;

public sealed record MfaStatusResult(
    bool IsEnabled,
    bool HasAuthenticator,
    int RecoveryCodesRemaining);
