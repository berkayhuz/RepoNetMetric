using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace NetMetric.Media.Options;

public sealed class MediaOptionsValidation(IHostEnvironment environment) : IValidateOptions<MediaOptions>
{
    private static readonly string[] UnsafeMarkers = ["localhost", "127.0.0.1", "example", "local", "dev", "test", "change_me", "replace"];

    public ValidateOptionsResult Validate(string? name, MediaOptions options)
    {
        var failures = new List<string>();
        ValidateSharedOptions(options, failures);

        if (environment.IsDevelopment() ||
            environment.IsEnvironment("Test") ||
            environment.IsEnvironment("Testing"))
        {
            return failures.Count == 0 ? ValidateOptionsResult.Success : ValidateOptionsResult.Fail(failures);
        }

        ValidateProductionOptions(options, failures);

        return failures.Count == 0 ? ValidateOptionsResult.Success : ValidateOptionsResult.Fail(failures);
    }

    private static void ValidateSharedOptions(MediaOptions options, List<string> failures)
    {
        if (!Uri.TryCreate(options.PublicBaseUrl, UriKind.Absolute, out var publicBaseUri) || publicBaseUri.Scheme != Uri.UriSchemeHttps)
        {
            failures.Add("Media:PublicBaseUrl must be an absolute HTTPS URL.");
        }

        if (options.MaxImageBytes <= 0 || options.MaxImageBytes > 25 * 1024 * 1024)
        {
            failures.Add("Media:MaxImageBytes must be between 1 byte and 25 MB.");
        }

        if (options.AllowedImageContentTypes.Length == 0 || options.AllowedImageExtensions.Length == 0)
        {
            failures.Add("Media allowed image content types/extensions must be configured.");
        }
    }

    private static void ValidateProductionOptions(MediaOptions options, List<string> failures)
    {
        if (ContainsUnsafeMarker(options.PublicBaseUrl))
        {
            failures.Add("Media:PublicBaseUrl must be a production CDN host.");
        }

        if (!string.Equals(options.StorageProvider, "CloudflareR2", StringComparison.OrdinalIgnoreCase))
        {
            failures.Add("Media:StorageProvider must be CloudflareR2 in production.");
        }

        if (string.IsNullOrWhiteSpace(options.CloudflareR2.AccountId) ||
            string.IsNullOrWhiteSpace(options.CloudflareR2.BucketName) ||
            string.IsNullOrWhiteSpace(options.CloudflareR2.AccessKeyId) ||
            string.IsNullOrWhiteSpace(options.CloudflareR2.SecretAccessKey))
        {
            failures.Add("Media:CloudflareR2 AccountId, BucketName, AccessKeyId and SecretAccessKey are required in production.");
        }

        if (ContainsUnsafeMarker(options.CloudflareR2.AccountId) ||
            ContainsUnsafeMarker(options.CloudflareR2.BucketName) ||
            ContainsUnsafeMarker(options.CloudflareR2.AccessKeyId))
        {
            failures.Add("Media:CloudflareR2 configuration contains unsafe placeholder values.");
        }
    }

    private static bool ContainsUnsafeMarker(string value) =>
        UnsafeMarkers.Any(marker => value.Contains(marker, StringComparison.OrdinalIgnoreCase));
}
