using MediatR;
using NetMetric.CRM.QuoteManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;
using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.QuoteManagement.Application.Handlers;

public sealed class ExpireQuoteCommandHandler(IQuoteManagementDbContext dbContext, ICurrentUserService currentUserService) : QuoteWorkflowHandlerBase(dbContext, currentUserService), IRequestHandler<ExpireQuoteCommand>
{
    public async Task Handle(ExpireQuoteCommand request, CancellationToken cancellationToken)
    {
        var entity = await LoadAndCheckAsync(request.QuoteId, request.RowVersion, QuoteStateMachine.CanExpire, "Quote cannot be expired from the current status.", cancellationToken);
        var oldStatus = entity.Status;
        entity.Status = QuoteStatusType.Expired;
        entity.ExpiredAt = request.ExpiredAt ?? DateTime.UtcNow;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = CurrentUserService.UserName;
        await QuoteHandlerHelpers.AddHistoryAsync(DbContext, CurrentUserService, entity, oldStatus, entity.Status, request.Note ?? "Quote expired.", cancellationToken);
        await DbContext.SaveChangesAsync(cancellationToken);
    }
}
