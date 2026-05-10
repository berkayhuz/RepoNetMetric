namespace NetMetric.Auth.Contracts.Internal;

public sealed record EmailChangeRequestIdentityRequest(string NewEmail, string CurrentPassword);
