using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetMetric.AspNetCore.ProblemDetails;
using NetMetric.Auth.Application.Exceptions;

namespace NetMetric.Auth.API.Exceptions;

public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var logLevel = exception switch
        {
            ValidationException => LogLevel.Warning,
            AuthApplicationException authException when authException.StatusCode >= 500 => LogLevel.Error,
            AuthApplicationException => LogLevel.Warning,
            DbUpdateConcurrencyException => LogLevel.Warning,
            _ => LogLevel.Error
        };

        logger.Log(logLevel, exception, "Unhandled exception for auth request {Path}.", httpContext.Request.Path);

        if (exception is ValidationException validationException)
        {
            var problemDetailsService = httpContext.RequestServices.GetRequiredService<IProblemDetailsService>();
            var problemDetails = new ValidationProblemDetails(
                validationException.Errors
                    .GroupBy(x => x.PropertyName)
                    .ToDictionary(group => group.Key, group => group.Select(error => error.ErrorMessage).ToArray()))
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Validation failed",
                Detail = "One or more validation errors occurred.",
                Type = "https://httpstatuses.com/400",
                Instance = httpContext.Request.Path
            };

            problemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;
            problemDetails.Extensions["correlationId"] = AspNetCore.RequestContext.RequestContextSupport.GetOrCreateCorrelationId(httpContext);
            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

            await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
            {
                HttpContext = httpContext,
                ProblemDetails = problemDetails
            });

            return true;
        }

        if (exception is AuthApplicationException applicationException)
        {
            await ProblemDetailsSupport.WriteProblemAsync(
                httpContext,
                applicationException.StatusCode,
                applicationException.Title,
                applicationException.Message,
                type: applicationException.Type,
                errorCode: applicationException.ErrorCode,
                cancellationToken: cancellationToken);

            return true;
        }

        if (exception is DbUpdateConcurrencyException)
        {
            await ProblemDetailsSupport.WriteProblemAsync(
                httpContext,
                StatusCodes.Status409Conflict,
                "Concurrency conflict",
                "The resource was modified by another request. Retry with the latest state.",
                errorCode: "concurrency_conflict",
                cancellationToken: cancellationToken);

            return true;
        }

        await ProblemDetailsSupport.WriteProblemAsync(
            httpContext,
            StatusCodes.Status500InternalServerError,
            "Server error",
            "An unexpected error occurred.",
            errorCode: "server_error",
            cancellationToken: cancellationToken);

        return true;
    }
}
