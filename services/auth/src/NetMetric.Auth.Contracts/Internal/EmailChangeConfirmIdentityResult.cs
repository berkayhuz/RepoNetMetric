namespace NetMetric.Auth.Contracts.Internal;

public sealed record EmailChangeConfirmIdentityResult(
    bool Succeeded,
    string? NewEmail,
    IReadOnlyCollection<PasswordPolicyFailure> Failures);
