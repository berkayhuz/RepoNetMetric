using Microsoft.Extensions.Options;
using NetMetric.Media.Abstractions;
using NetMetric.Media.Models;
using NetMetric.Media.Options;
using NetMetric.Media.Security;

namespace NetMetric.Media.Services;

public sealed class MediaAssetService(
    IMediaStorageProvider storageProvider,
    IMediaUrlBuilder urlBuilder,
    IImageValidator imageValidator,
    IImageMetadataReader metadataReader,
    IOptions<MediaOptions> options) : IMediaAssetService
{
    public async Task<MediaUploadResult> UploadImageAsync(MediaUploadRequest request, CancellationToken cancellationToken)
    {
        var validation = await imageValidator.ValidateAsync(request.OriginalFileName, request.ContentType, request.Content, request.Length, cancellationToken);
        if (!validation.IsValid || string.IsNullOrWhiteSpace(validation.CanonicalContentType) || string.IsNullOrWhiteSpace(validation.Extension))
        {
            throw new InvalidOperationException(validation.FailureReason ?? "Image validation failed.");
        }

        var tenantSegment = SanitizePathSegment(request.TenantId);
        var purposeSegment = SanitizePathSegment(request.Purpose);
        var assetId = Guid.NewGuid();
        var keyPrefix = string.IsNullOrWhiteSpace(options.Value.CloudflareR2.ObjectKeyPrefix)
            ? string.Empty
            : $"{SanitizePathSegment(options.Value.CloudflareR2.ObjectKeyPrefix)}/";
        var objectKey = $"{keyPrefix}media/{tenantSegment}/{purposeSegment}/{DateTime.UtcNow:yyyy}/{DateTime.UtcNow:MM}/{assetId}/original{validation.Extension}";

        using var imageCopy = new MemoryStream();
        await request.Content.CopyToAsync(imageCopy, cancellationToken);
        imageCopy.Position = 0;

        var metadata = await metadataReader.ReadAsync(imageCopy, cancellationToken);
        imageCopy.Position = 0;
        var hash = await MediaHashing.ComputeSha256HexAsync(imageCopy, cancellationToken);
        imageCopy.Position = 0;

        await storageProvider.SaveAsync(objectKey, imageCopy, validation.CanonicalContentType, cancellationToken);

        return new MediaUploadResult(
            validation.CanonicalContentType,
            validation.Extension,
            request.Length,
            hash,
            metadata.Width,
            metadata.Height,
            storageProvider.Name,
            objectKey,
            urlBuilder.BuildPublicUrl(objectKey));
    }

    public Task DeleteAsync(string storageKey, CancellationToken cancellationToken)
        => storageProvider.DeleteAsync(storageKey, cancellationToken);

    private static string SanitizePathSegment(string value)
    {
        var safe = value.Trim().Replace('\\', '-').Replace('/', '-').Replace("..", "-", StringComparison.Ordinal);
        return string.IsNullOrWhiteSpace(safe) ? "unknown" : safe.ToLowerInvariant();
    }
}
