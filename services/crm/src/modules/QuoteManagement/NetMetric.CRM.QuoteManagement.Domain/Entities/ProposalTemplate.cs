using NetMetric.Entities;

namespace NetMetric.CRM.QuoteManagement.Domain.Entities;

public class ProposalTemplate : AuditableEntity
{
    public string Name { get; set; } = null!;
    public string? SubjectTemplate { get; set; }
    public string BodyTemplate { get; set; } = null!;
    public bool IsDefault { get; set; }
    public string? Notes { get; set; }

    public void SetNotes(string? notes) => Notes = string.IsNullOrWhiteSpace(notes) ? null : notes.Trim();
}
