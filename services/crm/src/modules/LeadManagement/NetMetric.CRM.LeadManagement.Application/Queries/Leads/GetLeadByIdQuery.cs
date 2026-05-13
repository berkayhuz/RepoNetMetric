using MediatR;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;

namespace NetMetric.CRM.LeadManagement.Application.Queries.Leads;

public sealed record GetLeadByIdQuery(Guid LeadId) : IRequest<LeadDetailDto?>;
