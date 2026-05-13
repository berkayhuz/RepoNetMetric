namespace NetMetric.Notification.Infrastructure.Channels;

public interface ISmsProvider
{
    string Name { get; }

    Task<string?> SendAsync(
        string phoneNumber,
        string message,
        string? correlationId,
        CancellationToken cancellationToken);
}
