using NetMetric.Tools.Application.Abstractions.Security;

namespace NetMetric.Tools.Infrastructure.Security;

public sealed class NoOpToolsFileSecurityScanner : IToolsFileSecurityScanner
{
    public Task<ToolsFileScanResult> ScanAsync(string fileName, string mimeType, Stream content, CancellationToken cancellationToken)
        => Task.FromResult(new ToolsFileScanResult(true));
}
