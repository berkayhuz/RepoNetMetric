namespace NetMetric.Auth.Contracts.Internal;

public sealed record EmailChangeRequestIdentityResult(
    bool Succeeded,
    IReadOnlyCollection<PasswordPolicyFailure> Failures);
