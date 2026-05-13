using MediatR;
using NetMetric.CRM.SupportInboxIntegration.Application.Abstractions.Persistence;
using NetMetric.CRM.SupportInboxIntegration.Domain.Entities;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Commands.Rules.CreateSupportInboxRule;

public sealed class CreateSupportInboxRuleCommandHandler(ISupportInboxIntegrationDbContext dbContext) : IRequestHandler<CreateSupportInboxRuleCommand>
{
    public async Task Handle(CreateSupportInboxRuleCommand request, CancellationToken cancellationToken)
    {
        await dbContext.Rules.AddAsync(new SupportInboxRule(request.ConnectionId, request.Name, request.MatchSender, request.MatchSubjectContains, request.AssignToQueueId, request.TicketCategoryId, request.SlaPolicyId, request.AutoCreateTicket), cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
