using MediatR;
using NetMetric.CRM.WorkflowAutomation.Contracts.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Automation.Queries.ListExecutionLogs;

public sealed record ListExecutionLogsQuery(
    Guid TenantId,
    Guid? RuleId,
    string? Status,
    bool? FailedOnly,
    int Page,
    int PageSize) : IRequest<PagedResult<WorkflowExecutionLogListItemDto>>;
