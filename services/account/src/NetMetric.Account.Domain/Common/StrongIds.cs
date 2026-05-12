namespace NetMetric.Account.Domain.Common;

public readonly record struct TenantId(Guid Value)
{
    public static TenantId From(Guid value) => value == Guid.Empty
        ? throw new DomainValidationException("Tenant id cannot be empty.")
        : new TenantId(value);
}

public readonly record struct UserId(Guid Value)
{
    public static UserId From(Guid value) => value == Guid.Empty
        ? throw new DomainValidationException("User id cannot be empty.")
        : new UserId(value);
}

public readonly record struct UserSessionId(Guid Value)
{
    public static UserSessionId From(Guid value) => value == Guid.Empty
        ? throw new DomainValidationException("User session id cannot be empty.")
        : new UserSessionId(value);
}
