using NetMetric.AspNetCore.ProblemDetails;

namespace NetMetric.Auth.API.Writers;

public static class ProblemDetailsWriter
{
    public static async Task WriteAsync(
        HttpContext context,
        int statusCode,
        string title,
        string detail,
        string? type = null,
        string? errorCode = null,
        CancellationToken cancellationToken = default)
    {
        await ProblemDetailsSupport.WriteProblemAsync(
            context,
            statusCode,
            title,
            detail,
            type,
            errorCode,
            cancellationToken);
    }
}
