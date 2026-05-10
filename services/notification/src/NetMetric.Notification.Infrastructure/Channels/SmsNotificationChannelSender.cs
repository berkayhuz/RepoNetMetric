using NetMetric.Notification.Application.Abstractions;
using NetMetric.Notification.Contracts.Notifications.Enums;
using NetMetric.Notification.Contracts.Notifications.Requests;

namespace NetMetric.Notification.Infrastructure.Channels;

public sealed class SmsNotificationChannelSender(ISmsProvider smsProvider) : INotificationChannelSender
{
    public NotificationChannel Channel => NotificationChannel.Sms;
    public string ProviderName => smsProvider.Name;

    public async Task<NotificationChannelSendResult> SendAsync(
        SendNotificationRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Recipient.PhoneNumber))
        {
            return new NotificationChannelSendResult(
                Succeeded: false,
                ExternalMessageId: null,
                ErrorCode: "sms_recipient_missing",
                ErrorMessage: "SMS channel requires recipient phone number.");
        }

        var externalId = await smsProvider.SendAsync(
            request.Recipient.PhoneNumber,
            request.TextBody,
            request.CorrelationId,
            cancellationToken);

        return new NotificationChannelSendResult(true, externalId, null, null);
    }
}
