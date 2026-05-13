namespace NetMetric.Account.Domain.Common;

public sealed class DomainValidationException(string message) : InvalidOperationException(message);
