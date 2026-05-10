namespace NetMetric.Auth.Contracts.Internal;

public sealed record ChangePasswordIdentityResult(
    bool Succeeded,
    IReadOnlyCollection<PasswordPolicyFailure> Failures);
