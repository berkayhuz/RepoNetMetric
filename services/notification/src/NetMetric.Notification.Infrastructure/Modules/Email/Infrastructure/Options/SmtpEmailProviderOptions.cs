using System.ComponentModel.DataAnnotations;

namespace NetMetric.Notification.Infrastructure.Modules.Email.Infrastructure.Options;

public sealed class SmtpEmailProviderOptions
{
    public const string SectionName = "Notification:Email:Smtp";

    [Required]
    public string Host { get; init; } = string.Empty;

    [Range(1, 65535)]
    public int Port { get; init; } = 587;

    [Required]
    [EmailAddress]
    public string FromAddress { get; init; } = string.Empty;

    [Required]
    public string FromName { get; init; } = "NetMetric";

    public string? UserName { get; init; }
    public string? Password { get; init; }
    public bool UseStartTls { get; init; } = true;
}
