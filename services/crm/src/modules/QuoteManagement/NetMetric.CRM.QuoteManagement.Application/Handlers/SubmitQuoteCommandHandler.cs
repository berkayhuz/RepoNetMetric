using MediatR;
using NetMetric.CRM.QuoteManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;
using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.QuoteManagement.Application.Handlers;

public sealed class SubmitQuoteCommandHandler(IQuoteManagementDbContext dbContext, ICurrentUserService currentUserService) : QuoteWorkflowHandlerBase(dbContext, currentUserService), IRequestHandler<SubmitQuoteCommand>
{
    public async Task Handle(SubmitQuoteCommand request, CancellationToken cancellationToken)
    {
        var entity = await LoadAndCheckAsync(request.QuoteId, request.RowVersion, QuoteStateMachine.CanSubmit, "Quote cannot be submitted from the current status.", cancellationToken);
        var oldStatus = entity.Status;
        entity.Status = QuoteStatusType.Submitted;
        entity.SubmittedAt = DateTime.UtcNow;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = CurrentUserService.UserName;
        await QuoteHandlerHelpers.AddHistoryAsync(DbContext, CurrentUserService, entity, oldStatus, entity.Status, request.Note ?? "Quote submitted.", cancellationToken);
        await DbContext.SaveChangesAsync(cancellationToken);
    }
}
