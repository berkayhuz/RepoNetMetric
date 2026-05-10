namespace NetMetric.Notification.Infrastructure.Modules.Email.Application;

public interface IEmailProvider
{
    string Name { get; }

    Task SendAsync(EmailMessage message, CancellationToken cancellationToken);
}
