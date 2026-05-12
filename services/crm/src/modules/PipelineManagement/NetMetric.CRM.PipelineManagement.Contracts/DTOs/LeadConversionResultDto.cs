using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Contracts.DTOs;

public sealed record LeadConversionResultDto(Guid LeadId, Guid? CustomerId, Guid? OpportunityId, LeadStatusType LeadStatus, string Message);
