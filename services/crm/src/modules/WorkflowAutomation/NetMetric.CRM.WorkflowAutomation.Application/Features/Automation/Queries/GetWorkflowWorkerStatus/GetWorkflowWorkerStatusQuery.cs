using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Queries.GetWorkflowWorkerStatus;

public sealed record GetWorkflowWorkerStatusQuery(Guid TenantId) : IRequest<WorkflowWorkerStatusDto>;
