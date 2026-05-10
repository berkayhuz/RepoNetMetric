using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ConfirmEmailChangeCommand(
    Guid TenantId,
    Guid UserId,
    string NewEmail,
    string Token,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
