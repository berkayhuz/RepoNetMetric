using MediatR;
using NetMetric.CRM.QuoteManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;
using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.QuoteManagement.Application.Handlers;

public sealed class AcceptQuoteCommandHandler(IQuoteManagementDbContext dbContext, ICurrentUserService currentUserService) : QuoteWorkflowHandlerBase(dbContext, currentUserService), IRequestHandler<AcceptQuoteCommand>
{
    public async Task Handle(AcceptQuoteCommand request, CancellationToken cancellationToken)
    {
        var entity = await LoadAndCheckAsync(request.QuoteId, request.RowVersion, QuoteStateMachine.CanAccept, "Quote cannot be accepted from the current status.", cancellationToken);
        var oldStatus = entity.Status;
        entity.Status = QuoteStatusType.Accepted;
        entity.AcceptedAt = request.AcceptedAt ?? DateTime.UtcNow;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = CurrentUserService.UserName;
        await QuoteHandlerHelpers.AddHistoryAsync(DbContext, CurrentUserService, entity, oldStatus, entity.Status, request.Note ?? "Quote accepted by customer.", cancellationToken);
        await DbContext.SaveChangesAsync(cancellationToken);
    }
}
