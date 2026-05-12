using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.OpportunityManagement.Application.Abstractions.Persistence;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed class SoftDeleteOpportunityCommandHandler(IOpportunityManagementDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<SoftDeleteOpportunityCommand>
{
    public async Task Handle(SoftDeleteOpportunityCommand request, CancellationToken cancellationToken)
    {
        var opportunity = await dbContext.Opportunities.FirstOrDefaultAsync(x => x.TenantId == currentUserService.TenantId && x.Id == request.OpportunityId, cancellationToken)
            ?? throw new NotFoundAppException("Opportunity not found.");

        opportunity.Deactivate();
        dbContext.Opportunities.Remove(opportunity);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
