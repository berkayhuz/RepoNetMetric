using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;

namespace NetMetric.Localization;

public static class NetMetricCultures
{
    public const string DefaultCulture = "en-US";
    public const string TurkishCulture = "tr-TR";
    public const string EnglishCulture = "en-US";
    public const string CookieName = "nm_culture";
    public const string HeaderName = "X-NetMetric-Culture";

    public static readonly IReadOnlyList<string> SupportedCultureNames = [EnglishCulture, TurkishCulture];

    public static bool IsSupportedCulture(string? culture)
        => Normalize(culture) is not null;

    public static string NormalizeOrDefault(string? culture)
        => Normalize(culture) ?? DefaultCulture;

    public static string? Normalize(string? culture)
    {
        if (string.IsNullOrWhiteSpace(culture))
        {
            return null;
        }

        var value = culture.Trim();
        if (value.Equals("tr", StringComparison.OrdinalIgnoreCase) ||
            value.StartsWith("tr-", StringComparison.OrdinalIgnoreCase))
        {
            return TurkishCulture;
        }

        if (value.Equals("en", StringComparison.OrdinalIgnoreCase) ||
            value.StartsWith("en-", StringComparison.OrdinalIgnoreCase))
        {
            return EnglishCulture;
        }

        return SupportedCultureNames.Contains(value, StringComparer.OrdinalIgnoreCase)
            ? SupportedCultureNames.First(x => x.Equals(value, StringComparison.OrdinalIgnoreCase))
            : null;
    }

    public static void AppendCultureCookie(HttpResponse response, string? culture, string? domain = null)
    {
        var normalized = NormalizeOrDefault(culture);
        response.Cookies.Append(
            CookieName,
            normalized,
            new CookieOptions
            {
                Domain = string.IsNullOrWhiteSpace(domain) ? null : domain,
                Expires = DateTimeOffset.UtcNow.AddYears(1),
                HttpOnly = true,
                IsEssential = true,
                SameSite = SameSiteMode.Lax,
                Secure = true
            });
    }

    public static RequestCulture ToRequestCulture(string? culture)
    {
        var normalized = NormalizeOrDefault(culture);
        return new RequestCulture(normalized, normalized);
    }
}
