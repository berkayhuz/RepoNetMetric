namespace NetMetric.Media.Options;

public sealed class MediaCloudflareR2Options
{
    public string AccountId { get; init; } = string.Empty;
    public string BucketName { get; init; } = string.Empty;
    public string AccessKeyId { get; init; } = string.Empty;
    public string SecretAccessKey { get; init; } = string.Empty;
    public string EndpointUrl { get; init; } = string.Empty;
    public string ObjectKeyPrefix { get; init; } = "netmetric";
    public bool UsePathStyle { get; init; } = true;
}