using System;
using System.Collections.Generic;
using System.Text;

namespace NetMetric.CRM.QuoteManagement.Contracts.Requests;

public sealed class QuoteWorkflowRequest
{
    public string? Note { get; set; }
    public string? Reason { get; set; }
    public DateTime? OccurredAt { get; set; }
    public string? RowVersion { get; set; }
}