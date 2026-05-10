namespace NetMetric.Media.Abstractions;

public interface IMediaStorageProvider
{
    string Name { get; }
    Task SaveAsync(string key, Stream content, string contentType, CancellationToken cancellationToken);
    Task DeleteAsync(string key, CancellationToken cancellationToken);
    Task<bool> ExistsAsync(string key, CancellationToken cancellationToken);
}
