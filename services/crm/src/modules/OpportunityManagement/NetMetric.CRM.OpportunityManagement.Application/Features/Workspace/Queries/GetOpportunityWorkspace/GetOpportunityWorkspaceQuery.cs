using MediatR;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;

namespace NetMetric.CRM.OpportunityManagement.Application.Features.Workspace.Queries.GetOpportunityWorkspace;

public sealed record GetOpportunityWorkspaceQuery(Guid OpportunityId) : IRequest<OpportunityWorkspaceDto?>;
