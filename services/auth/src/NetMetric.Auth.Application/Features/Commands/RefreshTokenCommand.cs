using MediatR;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record RefreshTokenCommand(
    Guid TenantId,
    Guid SessionId,
    string RefreshToken,
    string? IpAddress,
    string? UserAgent) : IRequest<AuthenticationTokenResponse>;