namespace NetMetric.Tools.Infrastructure.Options;

public sealed class ToolsArtifactStorageOptions
{
    public const string SectionName = "Tools:ArtifactStorage";
    public string RootPath { get; init; } = ".local/tools-artifacts";
}
