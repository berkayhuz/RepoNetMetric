using MediatR;
using NetMetric.CRM.WorkManagement.Contracts.DTOs;

namespace NetMetric.CRM.WorkManagement.Application.Queries.GetWorkspace;

public sealed record GetWorkManagementWorkspaceQuery : IRequest<WorkManagementWorkspaceDto>;
