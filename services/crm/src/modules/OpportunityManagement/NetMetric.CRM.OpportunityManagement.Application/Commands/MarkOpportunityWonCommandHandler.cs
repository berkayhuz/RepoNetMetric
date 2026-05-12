using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.OpportunityManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.Sales;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed class MarkOpportunityWonCommandHandler(IOpportunityManagementDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<MarkOpportunityWonCommand, Guid?>
{
    public async Task<Guid?> Handle(MarkOpportunityWonCommand request, CancellationToken cancellationToken)
    {
        var opportunity = await dbContext.Opportunities.FirstOrDefaultAsync(x => x.TenantId == currentUserService.TenantId && x.Id == request.OpportunityId, cancellationToken)
            ?? throw new NotFoundAppException("Opportunity not found.");

        if (!string.IsNullOrWhiteSpace(request.RowVersion))
            opportunity.RowVersion = Convert.FromBase64String(request.RowVersion);

        opportunity.Stage = OpportunityStageType.Won;
        opportunity.Status = OpportunityStatusType.Won;
        opportunity.UpdatedAt = DateTime.UtcNow;
        opportunity.UpdatedBy = currentUserService.UserName;

        var deal = new Deal
        {
            TenantId = currentUserService.TenantId,
            DealCode = $"DEAL-{DateTime.UtcNow:yyyyMMddHHmmss}",
            Name = string.IsNullOrWhiteSpace(request.DealName) ? opportunity.Name : request.DealName.Trim(),
            TotalAmount = opportunity.ExpectedRevenue ?? opportunity.EstimatedAmount,
            ClosedDate = request.ClosedDate,
            OpportunityId = opportunity.Id,
            CustomerId = opportunity.CustomerId,
            OwnerUserId = opportunity.OwnerUserId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedBy = currentUserService.UserName,
            UpdatedBy = currentUserService.UserName
        };

        await dbContext.Deals.AddAsync(deal, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return deal.Id;
    }
}
