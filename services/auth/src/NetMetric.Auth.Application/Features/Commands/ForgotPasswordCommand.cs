using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ForgotPasswordCommand(
    Guid TenantId,
    string Email,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
