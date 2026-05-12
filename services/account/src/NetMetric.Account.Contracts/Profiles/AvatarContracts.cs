namespace NetMetric.Account.Contracts.Profiles;

public sealed record AvatarUploadResponse(
    Guid AssetId,
    string PublicUrl,
    string ContentType,
    long SizeBytes,
    int? Width,
    int? Height,
    string Status,
    string Purpose,
    DateTimeOffset CreatedAtUtc);
