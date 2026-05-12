using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Workspace.Queries.GetLeadWorkspace;

public sealed record GetLeadWorkspaceQuery(Guid LeadId) : IRequest<LeadWorkspaceDto?>;
