using MediatR;
using NetMetric.Auth.Application.Records;
using NetMetric.Auth.Contracts.Responses;

namespace NetMetric.Auth.Application.Features.Commands;

public sealed record CreateTenantInvitationCommand(
    Guid TenantId,
    Guid InvitedByUserId,
    string Email,
    string? FirstName,
    string? LastName,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<TenantInvitationResponse>;

public sealed record ListTenantInvitationsCommand(
    Guid TenantId,
    Guid RequestedByUserId) : IRequest<IReadOnlyCollection<TenantInvitationSummaryResponse>>;

public sealed record ResendTenantInvitationCommand(
    Guid TenantId,
    Guid InvitationId,
    Guid RequestedByUserId,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<TenantInvitationResponse>;

public sealed record RevokeTenantInvitationCommand(
    Guid TenantId,
    Guid InvitationId,
    Guid RequestedByUserId,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<TenantInvitationResponse>;

public sealed record AcceptTenantInvitationCommand(
    Guid TenantId,
    string Token,
    string UserName,
    string Email,
    string Password,
    string? FirstName,
    string? LastName,
    string? IpAddress,
    string? UserAgent,
    string? CorrelationId,
    string? TraceId) : IRequest<AuthSessionResult>;
