namespace NetMetric.Tools.Domain.ValueObjects;

public readonly record struct FileSizeBytes
{
    public const long AuthenticatedMaxBytes = 10L * 1024L * 1024L;
    public const long GuestGuidanceMaxBytes = 5L * 1024L * 1024L;

    public long Value { get; }

    public FileSizeBytes(long value)
    {
        if (value <= 0)
        {
            throw new ArgumentException("File size must be greater than zero.", nameof(value));
        }

        Value = value;
    }

    public override string ToString() => Value.ToString();
}
