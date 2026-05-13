using MediatR;

namespace NetMetric.CRM.WorkflowAutomation.Application.Features.Assignments.Commands.CreateAssignmentRule;

public sealed record CreateAssignmentRuleCommand(
    string Name,
    string EntityType,
    string ConditionJson,
    string? AssigneeSelectorJson = null,
    string? FallbackAssigneeJson = null,
    int Priority = 100) : IRequest<Guid>;
