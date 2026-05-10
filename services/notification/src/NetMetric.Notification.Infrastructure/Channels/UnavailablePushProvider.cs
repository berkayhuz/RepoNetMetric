namespace NetMetric.Notification.Infrastructure.Channels;

public sealed class UnavailablePushProvider : IPushProvider
{
    public string Name => "push-provider-not-configured";

    public Task<string?> SendAsync(
        string pushToken,
        string title,
        string body,
        string? correlationId,
        CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("Push provider is not configured for Notification service.");
    }
}
