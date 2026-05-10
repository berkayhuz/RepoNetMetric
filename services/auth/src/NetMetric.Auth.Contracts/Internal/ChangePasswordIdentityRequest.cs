namespace NetMetric.Auth.Contracts.Internal;

public sealed record ChangePasswordIdentityRequest(
    string CurrentPassword,
    string NewPassword,
    bool RevokeOtherSessions);
