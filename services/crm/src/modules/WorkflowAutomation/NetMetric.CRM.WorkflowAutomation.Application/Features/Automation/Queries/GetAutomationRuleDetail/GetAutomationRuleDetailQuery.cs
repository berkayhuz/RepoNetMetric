using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Queries.GetAutomationRuleDetail;

public sealed record GetAutomationRuleDetailQuery(Guid TenantId, Guid RuleId) : IRequest<WorkflowRuleDetailDto>;
