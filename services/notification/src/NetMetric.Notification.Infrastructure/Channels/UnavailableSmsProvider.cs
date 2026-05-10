namespace NetMetric.Notification.Infrastructure.Channels;

public sealed class UnavailableSmsProvider : ISmsProvider
{
    public string Name => "sms-provider-not-configured";

    public Task<string?> SendAsync(
        string phoneNumber,
        string message,
        string? correlationId,
        CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("SMS provider is not configured for Notification service.");
    }
}
