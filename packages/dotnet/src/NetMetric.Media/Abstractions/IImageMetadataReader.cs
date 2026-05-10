using NetMetric.Media.Models;

namespace NetMetric.Media.Abstractions;

public interface IImageMetadataReader
{
    Task<ImageMetadata> ReadAsync(Stream content, CancellationToken cancellationToken);
}
