using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record RevokeOtherSessionsCommand(
    Guid TenantId,
    Guid UserId,
    Guid CurrentSessionId,
    string? Email,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<Unit>;
