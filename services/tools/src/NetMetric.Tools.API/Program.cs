using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using NetMetric.AspNetCore.Health;
using NetMetric.Tools.API.DependencyInjection;
using NetMetric.Tools.API.Health;
using NetMetric.Tools.Application.DependencyInjection;
using NetMetric.Tools.Infrastructure.DependencyInjection;
using NetMetric.Tools.Persistence;
using NetMetric.Tools.Persistence.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<DefaultExceptionHandler>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddToolsApiAuthorization(builder.Configuration);
builder.Services.AddToolsApplication();
builder.Services.AddToolsInfrastructure(builder.Configuration);

var connectionString = builder.Configuration.GetConnectionString("ToolsDb");
if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("Connection string 'ToolsDb' is required.");
}

builder.Services.AddToolsPersistence(connectionString);

builder.Services.AddHealthChecks()
    .AddCheck("self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy("Tools API process is running."), tags: ["live"])
    .AddCheck<ToolsDbHealthCheck>("tools-db", tags: ["ready"]);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks(
    "/health/live",
    HealthResponseWriter.CreateMinimalOptions(registration => registration.Tags.Contains("live")))
    .AllowAnonymous();

app.MapHealthChecks(
    "/health/ready",
    HealthResponseWriter.CreateMinimalOptions(registration => registration.Tags.Contains("ready")))
    .AllowAnonymous();

await app.RunAsync();

public sealed class DefaultExceptionHandler(IProblemDetailsService problemDetailsService, ILogger<DefaultExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception in Tools API. CorrelationId={CorrelationId}", httpContext.TraceIdentifier);

        var statusCode = exception is InvalidOperationException
            ? StatusCodes.Status400BadRequest
            : StatusCodes.Status500InternalServerError;

        httpContext.Response.StatusCode = statusCode;

        return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
            {
                Status = statusCode,
                Title = statusCode == 400 ? "Invalid request" : "Server error",
                Detail = statusCode == 400 ? exception.Message : "An unexpected error occurred.",
                Extensions = { ["correlationId"] = httpContext.TraceIdentifier }
            }
        });
    }
}

public partial class Program;
