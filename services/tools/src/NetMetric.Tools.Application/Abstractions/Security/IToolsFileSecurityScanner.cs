namespace NetMetric.Tools.Application.Abstractions.Security;

public sealed record ToolsFileScanResult(bool IsSafe, string? Reason = null);

public interface IToolsFileSecurityScanner
{
    Task<ToolsFileScanResult> ScanAsync(string fileName, string mimeType, Stream content, CancellationToken cancellationToken);
}
