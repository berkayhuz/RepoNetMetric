namespace NetMetric.Tools.Application.Abstractions.Storage;

public sealed record ToolArtifactWriteRequest(string StorageKey, string MimeType, Stream Content, CancellationToken CancellationToken);

public sealed record ToolArtifactReadResult(Stream Content, string MimeType, long Length);

public interface IToolArtifactStorage
{
    Task PutAsync(ToolArtifactWriteRequest request);
    Task<ToolArtifactReadResult?> GetAsync(string storageKey, CancellationToken cancellationToken);
    Task<bool> ExistsAsync(string storageKey, CancellationToken cancellationToken);
    Task DeleteAsync(string storageKey, CancellationToken cancellationToken);
}
