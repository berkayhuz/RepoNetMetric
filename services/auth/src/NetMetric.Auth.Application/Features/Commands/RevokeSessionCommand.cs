using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record RevokeSessionCommand(
    Guid TenantId,
    Guid UserId,
    Guid CurrentSessionId,
    Guid SessionId,
    string? Email,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<bool>;