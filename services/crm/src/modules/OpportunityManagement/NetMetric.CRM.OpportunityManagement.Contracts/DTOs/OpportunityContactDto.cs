namespace NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

public sealed record OpportunityContactDto(Guid Id, Guid ContactId, bool IsDecisionMaker, bool IsPrimary);
