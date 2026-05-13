namespace NetMetric.CRM.LeadManagement.Contracts.DTOs;

public sealed record LeadConversionResultDto(
    Guid LeadId,
    Guid CustomerId,
    Guid? OpportunityId,
    string LeadStatus);
