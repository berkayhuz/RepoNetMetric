namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthenticatorTotpService
{
    string GenerateSharedKey();
    string BuildAuthenticatorUri(string issuer, string accountName, string sharedKey);
    bool VerifyCode(string sharedKey, string verificationCode, DateTime utcNow);
}
