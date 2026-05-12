using MediatR;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Rules.UpdateSupportInboxRule;

public sealed record UpdateSupportInboxRuleCommand(Guid RuleId, string Name, string? MatchSender, string? MatchSubjectContains, Guid? AssignToQueueId, Guid? TicketCategoryId, Guid? SlaPolicyId, bool AutoCreateTicket, bool IsActive) : IRequest;
