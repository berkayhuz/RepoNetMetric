namespace NetMetric.Auth.Contracts.Internal;

public sealed record MfaConfirmResult(
    bool Succeeded,
    IReadOnlyCollection<string> RecoveryCodes);
