namespace NetMetric.Account.Application.Common;

public static class VersionEncoding
{
    public static string Encode(byte[] version) => Convert.ToBase64String(version);

    public static byte[]? TryDecode(string? version)
    {
        if (string.IsNullOrWhiteSpace(version))
        {
            return null;
        }

        try
        {
            return Convert.FromBase64String(version);
        }
        catch (FormatException)
        {
            return null;
        }
    }
}
