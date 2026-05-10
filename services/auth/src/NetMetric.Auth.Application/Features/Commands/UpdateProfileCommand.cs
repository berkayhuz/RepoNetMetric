using MediatR;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record UpdateProfileCommand(
    Guid TenantId,
    Guid UserId,
    string? FirstName,
    string? LastName) : IRequest<UserProfileResponse>;
