namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class ProposalTemplateUpsertRequest
{
    public string Name { get; set; } = null!;
    public string? SubjectTemplate { get; set; }
    public string BodyTemplate { get; set; } = null!;
    public bool IsDefault { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }
}
