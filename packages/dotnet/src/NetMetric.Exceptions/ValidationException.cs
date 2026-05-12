namespace NetMetric.Exceptions;

public class ValidationException : Exception
{
    public IReadOnlyDictionary<string, string[]> Errors { get; } = new Dictionary<string, string[]>();

    public ValidationException(string message) : base(message) { }
    public ValidationException(string message, IDictionary<string, string[]> errors) : base(message)
        => Errors = new Dictionary<string, string[]>(errors);
}
