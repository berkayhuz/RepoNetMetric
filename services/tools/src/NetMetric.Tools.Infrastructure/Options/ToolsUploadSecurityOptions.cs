namespace NetMetric.Tools.Infrastructure.Options;

public sealed class ToolsUploadSecurityOptions
{
    public const string SectionName = "Tools:UploadSecurity";
    public long MaxUploadBytes { get; init; } = 10 * 1024 * 1024;
    public int MaxImageWidth { get; init; } = 8192;
    public int MaxImageHeight { get; init; } = 8192;
    public int MaxPdfPages { get; init; } = 200;
    public bool AllowNoOpScannerInProduction { get; init; }
}
