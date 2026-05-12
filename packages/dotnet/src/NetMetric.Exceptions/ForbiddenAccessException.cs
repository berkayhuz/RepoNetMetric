namespace NetMetric.Exceptions;

public class ForbiddenAccessException : Exception
{
    public ForbiddenAccessException() : base("Forbidden access.") { }
    public ForbiddenAccessException(string message) : base(message) { }
}
