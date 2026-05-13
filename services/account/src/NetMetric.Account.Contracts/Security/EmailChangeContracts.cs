namespace NetMetric.Account.Contracts.Security;

public sealed record EmailChangeRequest(string NewEmail, string CurrentPassword);

public sealed record EmailChangeConfirmRequest(string Token);

public sealed record EmailChangeRequestResponse(bool ConfirmationRequired);

public sealed record EmailChangeConfirmResponse(string NewEmail);
