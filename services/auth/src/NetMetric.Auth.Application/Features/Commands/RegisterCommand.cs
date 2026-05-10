using MediatR;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record RegisterCommand(
    string TenantName,
    string UserName,
    string Email,
    string Password,
    string? FirstName,
    string? LastName,
    string? Culture,
    string? IpAddress,
    string? UserAgent) : IRequest<AuthenticationTokenResponse>;
