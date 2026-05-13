using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ResetPasswordCommand(
    Guid TenantId,
    Guid UserId,
    string Token,
    string NewPassword,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
