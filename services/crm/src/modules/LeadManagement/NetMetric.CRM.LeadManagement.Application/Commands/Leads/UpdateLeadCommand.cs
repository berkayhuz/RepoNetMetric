using MediatR;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record UpdateLeadCommand(
    Guid LeadId,
    string FullName,
    string? CompanyName,
    string? Email,
    string? Phone,
    string? JobTitle,
    string? Description,
    decimal? EstimatedBudget,
    DateTime? NextContactDate,
    LeadSourceType Source,
    LeadStatusType Status,
    PriorityType Priority,
    Guid? CompanyId,
    Guid? OwnerUserId,
    string? Notes,
    string? RowVersion) : IRequest<LeadDetailDto>;
