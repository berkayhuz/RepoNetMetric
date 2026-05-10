using MediatR;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record LoginCommand(
    Guid TenantId,
    string EmailOrUserName,
    string Password,
    string? MfaCode,
    string? RecoveryCode,
    string? IpAddress,
    string? UserAgent) : IRequest<AuthenticationTokenResponse>;
