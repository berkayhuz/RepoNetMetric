using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Queries.GetExecutionLogDetail;

public sealed record GetExecutionLogDetailQuery(Guid TenantId, Guid ExecutionLogId) : IRequest<WorkflowExecutionLogDetailDto>;
