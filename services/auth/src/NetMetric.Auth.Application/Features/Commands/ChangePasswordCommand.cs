using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ChangePasswordCommand(
    Guid TenantId,
    Guid UserId,
    string CurrentPassword,
    string NewPassword,
    bool RevokeOtherSessions,
    Guid? ExcludedSessionId,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
