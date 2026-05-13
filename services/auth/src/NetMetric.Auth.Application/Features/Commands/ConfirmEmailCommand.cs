using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record ConfirmEmailCommand(
    Guid TenantId,
    Guid UserId,
    string Token,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest;
