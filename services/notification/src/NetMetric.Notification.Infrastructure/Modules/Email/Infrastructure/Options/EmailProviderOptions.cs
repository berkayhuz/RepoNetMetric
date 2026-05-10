using System.ComponentModel.DataAnnotations;

namespace NetMetric.Notification.Infrastructure.Modules.Email.Infrastructure.Options;

public sealed class EmailProviderOptions
{
    public const string SectionName = "Notification:Email";

    [Required]
    public string Provider { get; init; } = "smtp";
}
