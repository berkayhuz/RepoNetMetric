using Microsoft.IdentityModel.Tokens;

namespace NetMetric.Auth.Application.Abstractions;

public interface ITokenSigningKeyProvider
{
    SigningCredentials GetCurrentSigningCredentials();

    IReadOnlyCollection<SecurityKey> GetValidationKeys();

    string CurrentKeyId { get; }

    object GetJwksDocument(string issuer);
}
