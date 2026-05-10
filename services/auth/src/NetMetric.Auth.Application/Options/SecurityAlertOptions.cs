namespace NetMetric.Auth.Application.Options;

public sealed class SecurityAlertOptions
{
    public const string SectionName = "Security:Alerts";

    public bool EnableStructuredAlerts { get; set; } = true;
}
