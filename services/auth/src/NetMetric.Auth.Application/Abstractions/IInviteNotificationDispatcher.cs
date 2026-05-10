using NetMetric.Auth.Domain.Entities;

namespace NetMetric.Auth.Application.Abstractions;

public interface IInviteNotificationDispatcher
{
    Task SendInviteCreatedAsync(
        Tenant tenant,
        TenantInvitation invitation,
        User inviter,
        User? invitedUser,
        string rawToken,
        string? correlationId,
        string? traceId,
        DateTime utcNow,
        CancellationToken cancellationToken);

    Task SendInviteResentAsync(
        Tenant tenant,
        TenantInvitation invitation,
        User inviter,
        User? invitedUser,
        string rawToken,
        string? correlationId,
        string? traceId,
        DateTime utcNow,
        CancellationToken cancellationToken);
}
