using NetMetric.CRM.WorkManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.WorkManagement.Application.Queries.GetWorkspace;

public sealed record GetWorkManagementWorkspaceQuery : IRequest<WorkManagementWorkspaceDto>;
