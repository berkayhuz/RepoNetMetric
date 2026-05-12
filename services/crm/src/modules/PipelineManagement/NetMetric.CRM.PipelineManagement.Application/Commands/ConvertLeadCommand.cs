using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public sealed record ConvertLeadCommand(Guid LeadId, bool CreateCustomer, bool CreateOpportunity, Guid? ExistingCustomerId, string? OpportunityName, decimal? EstimatedAmount, OpportunityStageType InitialStage, PriorityType Priority, Guid? OwnerUserId, string? Notes) : IRequest<LeadConversionResultDto>;
