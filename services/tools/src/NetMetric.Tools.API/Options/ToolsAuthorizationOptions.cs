namespace NetMetric.Tools.API.Options;

public sealed class ToolsAuthorizationOptions
{
    public const string SectionName = "Tools:Authorization";
    public bool RequireAuthenticatedUserForHistory { get; init; } = true;
}
