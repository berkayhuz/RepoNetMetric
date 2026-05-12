using MediatR;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.LeadManagement.Application.Features.Conversions.Commands.ConvertLeadToCustomer;

public sealed record ConvertLeadToCustomerCommand(
    Guid LeadId,
    CustomerType CustomerType,
    bool MarkCustomerAsVip,
    bool CreateOpportunity,
    string? OpportunityName,
    decimal? EstimatedAmount,
    Guid? CompanyId) : IRequest<LeadConversionResultDto>;
