using NetMetric.CRM.Types;
using NetMetric.Entities;

namespace NetMetric.CRM.QuoteManagement.Domain.Entities;

public class QuoteStatusHistory : EntityBase
{
    public Guid QuoteId { get; set; }
    public QuoteStatusType? OldStatus { get; set; }
    public QuoteStatusType NewStatus { get; set; }
    public DateTime ChangedAt { get; set; }
    public Guid? ChangedByUserId { get; set; }
    public string? Note { get; set; }
}
