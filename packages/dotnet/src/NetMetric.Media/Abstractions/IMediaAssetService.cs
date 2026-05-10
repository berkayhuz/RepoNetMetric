using NetMetric.Media.Models;

namespace NetMetric.Media.Abstractions;

public interface IMediaAssetService
{
    Task<MediaUploadResult> UploadImageAsync(MediaUploadRequest request, CancellationToken cancellationToken);
    Task DeleteAsync(string storageKey, CancellationToken cancellationToken);
}
