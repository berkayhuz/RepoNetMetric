namespace NetMetric.Auth.Contracts.Internal;

public sealed record MfaSetupResult(
    string SharedKey,
    string AuthenticatorUri);
