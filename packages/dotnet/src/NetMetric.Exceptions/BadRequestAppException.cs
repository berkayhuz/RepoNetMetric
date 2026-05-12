using System.ComponentModel.DataAnnotations;

namespace NetMetric.Exceptions;

public class BadRequestAppException : ValidationException
{
    public BadRequestAppException(string message) : base(message) { }
}
