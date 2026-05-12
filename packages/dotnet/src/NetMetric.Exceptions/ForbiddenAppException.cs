namespace NetMetric.Exceptions;

public class ForbiddenAppException : ForbiddenAccessException
{
    public ForbiddenAppException(string message) : base(message) { }
}
