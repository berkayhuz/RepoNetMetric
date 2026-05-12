namespace NetMetric.Exceptions;

public class NotFoundAppException : NotFoundException
{
    public NotFoundAppException(string message) : base(message) { }
    public NotFoundAppException(string name, object key) : base(name, key) { }
}
