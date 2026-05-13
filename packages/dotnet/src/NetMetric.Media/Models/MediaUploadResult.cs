namespace NetMetric.Media.Models;

public sealed record MediaUploadResult(
    string ContentType,
    string Extension,
    long SizeBytes,
    string Sha256Hash,
    int? Width,
    int? Height,
    string StorageProvider,
    string StorageKey,
    string PublicUrl);
