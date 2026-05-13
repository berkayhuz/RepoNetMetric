namespace NetMetric.Account.Infrastructure.Outbox;

public static class OutboxEventTypes
{
    public const string SecurityNotificationRequested = "account.security_notification.requested";
    public const string SecurityEventRaised = "account.security_event.raised";
}
