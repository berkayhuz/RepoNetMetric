using Microsoft.AspNetCore.DataProtection;
using NetMetric.Auth.Application.Abstractions;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class AuthenticatorKeyProtector(IDataProtectionProvider dataProtectionProvider) : IAuthenticatorKeyProtector
{
    private readonly IDataProtector _protector = dataProtectionProvider.CreateProtector("NetMetric.Auth.Mfa.AuthenticatorKey.v1");

    public string Protect(string sharedKey) => _protector.Protect(sharedKey);

    public string Unprotect(string protectedSharedKey) => _protector.Unprotect(protectedSharedKey);
}
