using MediatR;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;

namespace NetMetric.CRM.LeadManagement.Application.Features.Workspace.Queries.GetLeadWorkspace;

public sealed record GetLeadWorkspaceQuery(Guid LeadId) : IRequest<LeadWorkspaceDto?>;
