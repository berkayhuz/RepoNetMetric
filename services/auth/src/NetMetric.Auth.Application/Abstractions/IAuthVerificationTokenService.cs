namespace NetMetric.Auth.Application.Abstractions;

public interface IAuthVerificationTokenService
{
    string GenerateToken();
    string HashToken(string token);
}
