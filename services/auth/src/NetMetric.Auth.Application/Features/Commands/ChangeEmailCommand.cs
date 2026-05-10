using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ChangeEmailCommand(
    Guid TenantId,
    Guid UserId,
    string NewEmail,
    string CurrentEmail,
    string? CurrentPassword,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
