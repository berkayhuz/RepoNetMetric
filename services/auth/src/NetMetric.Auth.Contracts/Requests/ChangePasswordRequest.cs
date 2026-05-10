namespace NetMetric.Auth.Contracts.Requests;

public sealed record ChangePasswordRequest(string CurrentPassword, string NewPassword);
