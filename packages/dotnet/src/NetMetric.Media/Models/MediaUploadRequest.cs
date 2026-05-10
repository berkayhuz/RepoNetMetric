namespace NetMetric.Media.Models;

public sealed record MediaUploadRequest(
    string TenantId,
    string Purpose,
    string? OwnerUserId,
    string OriginalFileName,
    string ContentType,
    Stream Content,
    long Length,
    string Module);