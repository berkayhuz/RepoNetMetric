using NetMetric.CRM.Types;
    
namespace NetMetric.CRM.PipelineManagement.Contracts.Requests;

public sealed record ConvertLeadRequest(bool CreateCustomer, bool CreateOpportunity, Guid? ExistingCustomerId, string? OpportunityName, decimal? EstimatedAmount, OpportunityStageType InitialStage, PriorityType Priority, Guid? OwnerUserId, string? Notes);
