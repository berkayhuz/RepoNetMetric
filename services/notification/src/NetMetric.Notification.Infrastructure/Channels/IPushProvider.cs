namespace NetMetric.Notification.Infrastructure.Channels;

public interface IPushProvider
{
    string Name { get; }

    Task<string?> SendAsync(
        string pushToken,
        string title,
        string body,
        string? correlationId,
        CancellationToken cancellationToken);
}
