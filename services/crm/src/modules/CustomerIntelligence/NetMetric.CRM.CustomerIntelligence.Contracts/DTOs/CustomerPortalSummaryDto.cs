namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed class CustomerPortalSummaryDto
{
    public required Guid CustomerId { get; init; }
    public required string DisplayName { get; init; }
    public required decimal HealthScore { get; init; }
    public required int OpenTickets { get; init; }
    public required int OpenOpportunities { get; init; }
    public required int OpenInvoices { get; init; }
}
