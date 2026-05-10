using NetMetric.Media.Models;

namespace NetMetric.Media.Abstractions;

public interface IImageValidator
{
    Task<ImageValidationResult> ValidateAsync(string fileName, string declaredContentType, Stream content, long length, CancellationToken cancellationToken);
}
