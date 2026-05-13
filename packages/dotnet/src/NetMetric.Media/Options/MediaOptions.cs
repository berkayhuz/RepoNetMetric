namespace NetMetric.Media.Options;

public sealed class MediaOptions
{
    public const string SectionName = "Media";

    public string PublicBaseUrl { get; init; } = "https://cdn.netmetric.net";
    public string StorageProvider { get; init; } = "LocalFile";
    public long MaxImageBytes { get; init; } = 5 * 1024 * 1024;
    public string[] AllowedImageContentTypes { get; init; } = ["image/jpeg", "image/png", "image/webp"];
    public string[] AllowedImageExtensions { get; init; } = [".jpg", ".jpeg", ".png", ".webp"];
    public MediaLocalOptions Local { get; init; } = new();
    public MediaCloudflareR2Options CloudflareR2 { get; init; } = new();
}
