using System.ComponentModel.DataAnnotations;

namespace NetMetric.Notification.Infrastructure.Integration;

public sealed class NotificationIntegrationConsumerOptions
{
    public const string SectionName = "Notification:IntegrationConsumer";

    public bool Enabled { get; init; } = true;

    [Required]
    public string QueueName { get; init; } = "netmetric.notification.integration.v1";
}
