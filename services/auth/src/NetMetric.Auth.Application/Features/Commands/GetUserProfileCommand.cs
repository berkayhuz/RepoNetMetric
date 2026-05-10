using MediatR;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record GetUserProfileCommand(Guid TenantId, Guid UserId) : IRequest<UserProfileResponse>;
