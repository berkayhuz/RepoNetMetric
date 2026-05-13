namespace NetMetric.Tools.Domain.ValueObjects;

public readonly record struct OwnerUserId(Guid Value)
{
    public static OwnerUserId From(Guid value)
    {
        if (value == Guid.Empty)
        {
            throw new ArgumentException("Owner user id cannot be empty.", nameof(value));
        }

        return new OwnerUserId(value);
    }

    public override string ToString() => Value.ToString("D");
}
