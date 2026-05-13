namespace NetMetric.Tools.Domain.ValueObjects;

public readonly record struct ToolArtifactId(Guid Value)
{
    public static ToolArtifactId New() => new(Guid.NewGuid());
    public override string ToString() => Value.ToString("D");
}
