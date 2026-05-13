namespace NetMetric.Tools.Domain.ValueObjects;

public readonly record struct ToolRunId(Guid Value)
{
    public static ToolRunId New() => new(Guid.NewGuid());
    public override string ToString() => Value.ToString("D");
}
