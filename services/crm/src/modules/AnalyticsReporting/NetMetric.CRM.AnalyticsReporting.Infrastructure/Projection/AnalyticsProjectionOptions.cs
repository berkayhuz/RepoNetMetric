namespace NetMetric.CRM.AnalyticsReporting.Infrastructure.Projection;

public sealed class AnalyticsProjectionOptions
{
    public const string SectionName = "Crm:AnalyticsProjection";

    public bool Enabled { get; set; } = true;
    public int InitialDelaySeconds { get; set; } = 15;
    public int IntervalSeconds { get; set; } = 300;
}
