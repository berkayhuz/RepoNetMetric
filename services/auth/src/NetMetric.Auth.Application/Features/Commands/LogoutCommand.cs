using MediatR;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record LogoutCommand(
    Guid TenantId,
    Guid SessionId,
    string RefreshToken) : IRequest<Unit>;
