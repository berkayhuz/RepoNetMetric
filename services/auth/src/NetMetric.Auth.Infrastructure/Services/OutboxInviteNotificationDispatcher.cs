using Microsoft.Extensions.Options;
using NetMetric.Auth.Application.Abstractions;
using NetMetric.Auth.Application.Options;
using NetMetric.Auth.Domain.Entities;
using NetMetric.Notification.Contracts.IntegrationEvents.V1;
using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Models;

namespace NetMetric.Auth.Infrastructure.Services;

public sealed class OutboxInviteNotificationDispatcher(
    IIntegrationEventOutbox outbox,
    IOptions<InvitationDeliveryOptions> options) : IInviteNotificationDispatcher
{
    public Task SendInviteCreatedAsync(
        Tenant tenant,
        TenantInvitation invitation,
        User inviter,
        User? invitedUser,
        string rawToken,
        string? correlationId,
        string? traceId,
        DateTime utcNow,
        CancellationToken cancellationToken) =>
        EnqueueAsync(tenant, invitation, inviter, invitedUser, rawToken, "created", correlationId, traceId, utcNow, cancellationToken);

    public Task SendInviteResentAsync(
        Tenant tenant,
        TenantInvitation invitation,
        User inviter,
        User? invitedUser,
        string rawToken,
        string? correlationId,
        string? traceId,
        DateTime utcNow,
        CancellationToken cancellationToken) =>
        EnqueueAsync(tenant, invitation, inviter, invitedUser, rawToken, "resent", correlationId, traceId, utcNow, cancellationToken);

    private Task EnqueueAsync(
        Tenant tenant,
        TenantInvitation invitation,
        User inviter,
        User? invitedUser,
        string rawToken,
        string deliveryReason,
        string? correlationId,
        string? traceId,
        DateTime utcNow,
        CancellationToken cancellationToken)
    {
        var invitationUrl = options.Value.BuildAcceptUrl(tenant.Id, rawToken, invitation.Email);
        var inviterDisplayName = DisplayName(inviter);
        var metadata = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["inviterDisplayName"] = inviterDisplayName,
            ["tenantName"] = tenant.Name,
            ["invitationUrl"] = invitationUrl,
            ["invitationId"] = invitation.Id.ToString("D"),
            ["deliveryReason"] = deliveryReason,
            ["expiresAtUtc"] = invitation.ExpiresAtUtc.ToString("O")
        };

        var payload = new NotificationRequestedV1(
            Guid.NewGuid(),
            tenant.Id,
            invitedUser?.Id,
            "NetMetric.Auth",
            NotificationCategory.Account,
            NotificationPriority.High,
            new NotificationRecipient(
                invitedUser?.Id,
                invitation.Email,
                null,
                null,
                invitation.FirstName ?? invitation.Email),
            invitedUser is null
                ? [NotificationChannel.Email]
                : [NotificationChannel.InApp, NotificationChannel.Email],
            "{{inviterDisplayName}} invited you to {{tenantName}} on NetMetric",
            "Accept your invitation: {{invitationUrl}}",
            "<p>{{inviterDisplayName}} invited you to <strong>{{tenantName}}</strong> on NetMetric.</p><p><a href=\"{{invitationUrl}}\">Accept your invitation</a></p><p>This invitation expires at {{expiresAtUtc}}.</p>",
            new NotificationTemplateData("auth.tenant_invitation.v1", metadata),
            metadata,
            correlationId,
            $"{invitation.Id:N}:{deliveryReason}",
            utcNow);

        return outbox.AddAsync(
            Guid.NewGuid(),
            NotificationRequestedV1.EventName,
            NotificationRequestedV1.EventVersion,
            NotificationRequestedV1.RoutingKey,
            "NetMetric.Auth",
            payload,
            correlationId,
            traceId,
            utcNow,
            cancellationToken);
    }

    private static string DisplayName(User user)
    {
        var value = string.Join(' ', new[] { user.FirstName, user.LastName }.Where(x => !string.IsNullOrWhiteSpace(x)));
        return string.IsNullOrWhiteSpace(value) ? user.Email ?? user.UserName : value;
    }
}
