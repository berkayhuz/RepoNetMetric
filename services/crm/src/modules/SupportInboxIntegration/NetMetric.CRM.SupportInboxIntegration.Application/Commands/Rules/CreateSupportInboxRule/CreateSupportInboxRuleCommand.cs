using MediatR;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Rules.CreateSupportInboxRule;

public sealed record CreateSupportInboxRuleCommand(Guid ConnectionId, string Name, string? MatchSender, string? MatchSubjectContains, Guid? AssignToQueueId, Guid? TicketCategoryId, Guid? SlaPolicyId, bool AutoCreateTicket) : IRequest;
