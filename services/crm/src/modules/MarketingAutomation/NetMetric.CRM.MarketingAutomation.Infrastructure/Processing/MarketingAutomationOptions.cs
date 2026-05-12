namespace NetMetric.CRM.MarketingAutomation.Infrastructure.Processing;

public sealed class MarketingAutomationOptions
{
    public const string SectionName = "Crm:MarketingAutomation";
    public bool EngineEnabled { get; set; } = true;
    public bool WorkerEnabled { get; set; }
    public bool EmailDeliveryEnabled { get; set; }
    public int BatchSize { get; set; } = 50;
    public int MaxAttempts { get; set; } = 3;
    public int BaseRetryDelaySeconds { get; set; } = 60;
}
