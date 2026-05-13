namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class GuidedSellingRequest
{
    public string? Segment { get; set; }
    public string? Industry { get; set; }
    public decimal? Budget { get; set; }
    public List<string> RequiredCapabilities { get; set; } = new();
}
