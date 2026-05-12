using MediatR;
using NetMetric.CRM.OpportunityManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.OpportunityManagement.Application.Common;
using NetMetric.CRM.OpportunityManagement.Contracts.DTOs;
using NetMetric.CRM.Sales;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.OpportunityManagement.Application.Commands;

public sealed class CreateOpportunityCommandHandler(IOpportunityManagementDbContext dbContext, ICurrentUserService currentUserService) : IRequestHandler<CreateOpportunityCommand, OpportunityDetailDto>
{
    public async Task<OpportunityDetailDto> Handle(CreateOpportunityCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();
        EnsureSupportedReferences(request.LeadId, request.CustomerId);

        var entity = new Opportunity
        {
            TenantId = currentUserService.TenantId,
            OpportunityCode = request.OpportunityCode.Trim(),
            Name = request.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            EstimatedAmount = request.EstimatedAmount,
            ExpectedRevenue = request.ExpectedRevenue,
            Probability = request.Probability,
            EstimatedCloseDate = request.EstimatedCloseDate,
            Stage = request.Stage,
            Status = request.Status,
            Priority = request.Priority,
            LeadId = request.LeadId,
            CustomerId = request.CustomerId,
            OwnerUserId = request.OwnerUserId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedBy = currentUserService.UserName,
            UpdatedBy = currentUserService.UserName
        };
        entity.SetNotes(request.Notes);

        await dbContext.Opportunities.AddAsync(entity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        await dbContext.OpportunityStageHistories.AddAsync(new OpportunityStageHistory
        {
            TenantId = currentUserService.TenantId,
            OpportunityId = entity.Id,
            OldStage = entity.Stage,
            NewStage = entity.Stage,
            ChangedAt = DateTime.UtcNow,
            ChangedByUserId = currentUserService.UserId,
            Note = "Opportunity created.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            CreatedBy = currentUserService.UserName,
            UpdatedBy = currentUserService.UserName
        }, cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);
        return entity.ToDetailDto([], [], [], []);
    }

    private static void EnsureSupportedReferences(Guid? leadId, Guid? customerId)
    {
        if (leadId.HasValue)
        {
            throw new ValidationAppException("LeadId cannot be linked directly in the OpportunityManagement write model.");
        }

        if (customerId.HasValue)
        {
            throw new ValidationAppException("CustomerId cannot be linked directly in the OpportunityManagement write model.");
        }
    }
}
