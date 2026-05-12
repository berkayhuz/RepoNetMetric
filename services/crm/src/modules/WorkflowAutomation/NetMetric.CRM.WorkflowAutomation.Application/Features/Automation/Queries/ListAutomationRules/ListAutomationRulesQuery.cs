using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Queries.ListAutomationRules;

public sealed record ListAutomationRulesQuery(
    Guid TenantId,
    string? TriggerType,
    string? EntityType,
    bool? IsActive,
    int Page,
    int PageSize,
    string? SortBy,
    string? SortDirection) : IRequest<PagedResult<WorkflowRuleListItemDto>>;
