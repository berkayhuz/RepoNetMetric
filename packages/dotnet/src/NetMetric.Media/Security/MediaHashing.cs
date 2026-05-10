using System.Security.Cryptography;

namespace NetMetric.Media.Security;

public static class MediaHashing
{
    public static async Task<string> ComputeSha256HexAsync(Stream stream, CancellationToken cancellationToken)
    {
        using var sha256 = SHA256.Create();
        var hash = await sha256.ComputeHashAsync(stream, cancellationToken);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}
