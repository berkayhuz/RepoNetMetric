namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthenticatorKeyProtector
{
    string Protect(string sharedKey);
    string Unprotect(string protectedSharedKey);
}
