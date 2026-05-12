using MediatR;
using NetMetric.CRM.DealManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.DealManagement.Application.Commands.Deals;
using NetMetric.CurrentUser;

namespace NetMetric.CRM.DealManagement.Application.Handlers;

public sealed class MarkDealWonCommandHandler(IDealManagementDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<MarkDealWonCommand>
{
    public async Task Handle(MarkDealWonCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();
        var entity = await DealHandlerHelpers.RequireDealAsync(dbContext, request.DealId, cancellationToken);
        DealHandlerHelpers.ApplyRowVersion(entity, request.RowVersion);
        if (entity.TotalAmount <= 0m)
            entity.TotalAmount = 1m;
        entity.ClosedDate = request.OccurredAt ?? DateTime.UtcNow;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = currentUserService.UserName;

        await DealHandlerHelpers.AppendHistoryAsync(dbContext, currentUserService, entity, "Won", "Won", request.OccurredAt ?? DateTime.UtcNow, null, request.Note, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
