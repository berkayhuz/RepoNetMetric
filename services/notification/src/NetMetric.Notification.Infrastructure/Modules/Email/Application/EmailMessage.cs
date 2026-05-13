namespace NetMetric.Notification.Infrastructure.Modules.Email.Application;

public sealed record EmailMessage(
    string To,
    string Subject,
    string HtmlBody,
    string TextBody,
    string? CorrelationId);
