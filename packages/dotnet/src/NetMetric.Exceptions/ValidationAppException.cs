namespace NetMetric.Exceptions;

public class ValidationAppException : ValidationException
{
    public ValidationAppException(string message) : base(message) { }
    public ValidationAppException(string message, IDictionary<string, string[]> errors) : base(message, errors) { }
}
