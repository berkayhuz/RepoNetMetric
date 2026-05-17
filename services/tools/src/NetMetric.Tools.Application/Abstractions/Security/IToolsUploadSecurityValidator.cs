namespace NetMetric.Tools.Application.Abstractions.Security;

public sealed record ToolsUploadValidationRequest(
    string DeclaredMimeType,
    string OriginalFileName,
    long ContentLength,
    IReadOnlyCollection<string> AllowedMimeTypes,
    Stream Content);

public sealed record ToolsUploadValidationResult(
    string DetectedMimeType,
    string SafeFileName,
    string ChecksumSha256);

public interface IToolsUploadSecurityValidator
{
    Task<ToolsUploadValidationResult> ValidateAsync(ToolsUploadValidationRequest request, CancellationToken cancellationToken);
}
