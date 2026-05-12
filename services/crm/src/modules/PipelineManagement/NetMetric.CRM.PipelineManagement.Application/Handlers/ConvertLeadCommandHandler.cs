using MediatR;
using Microsoft.EntityFrameworkCore;
using NetMetric.CRM.Core;
using NetMetric.CRM.PipelineManagement.Application.Abstractions.Persistence;
using NetMetric.CRM.PipelineManagement.Application.Commands;
using NetMetric.CRM.PipelineManagement.Application.Common;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;
using NetMetric.CRM.Sales;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.PipelineManagement.Application.Handlers;

public sealed class ConvertLeadCommandHandler(IPipelineManagementDbContext dbContext, ICurrentUserService currentUserService)
    : IRequestHandler<ConvertLeadCommand, LeadConversionResultDto>
{
    public async Task<LeadConversionResultDto> Handle(ConvertLeadCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();
        var tenantId = currentUserService.EnsureTenant();

        var lead = await dbContext.Leads.FirstOrDefaultAsync(
                x => x.Id == request.LeadId && x.TenantId == tenantId,
                cancellationToken)
            ?? throw new NotFoundAppException("Lead not found.");

        Customer? customer = null;
        if (request.ExistingCustomerId.HasValue)
        {
            customer = await dbContext.Customers.FirstOrDefaultAsync(
                    x => x.Id == request.ExistingCustomerId.Value && x.TenantId == tenantId,
                    cancellationToken)
                ?? throw new NotFoundAppException("Customer not found.");
        }

        if (request.CreateCustomer)
        {
            var (firstName, lastName) = PipelineDefaults.SplitFullName(lead.FullName);
            customer = new Customer
            {
                TenantId = tenantId,
                FirstName = firstName,
                LastName = string.IsNullOrWhiteSpace(lastName) ? "-" : lastName,
                Email = lead.Email,
                JobTitle = lead.JobTitle,
                Description = string.IsNullOrWhiteSpace(request.Notes) ? lead.Description : request.Notes,
                CompanyId = lead.CompanyId,
                OwnerUserId = request.OwnerUserId ?? lead.OwnerUserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedBy = currentUserService.UserName,
                UpdatedBy = currentUserService.UserName
            };
            await dbContext.Customers.AddAsync(customer, cancellationToken);
        }

        Opportunity? opportunity = null;
        if (request.CreateOpportunity)
        {
            var targetCustomerId = customer?.Id ?? request.ExistingCustomerId;
            if (!targetCustomerId.HasValue)
                throw new ConflictAppException("Opportunity creation requires a customer.");

            opportunity = new Opportunity
            {
                TenantId = tenantId,
                OpportunityCode = $"OPP-{DateTime.UtcNow:yyyyMMddHHmmss}",
                Name = string.IsNullOrWhiteSpace(request.OpportunityName) ? $"{lead.FullName} Opportunity" : request.OpportunityName.Trim(),
                Description = string.IsNullOrWhiteSpace(request.Notes) ? lead.Description : request.Notes,
                EstimatedAmount = request.EstimatedAmount ?? lead.EstimatedBudget ?? 0m,
                ExpectedRevenue = request.EstimatedAmount ?? lead.EstimatedBudget,
                Probability = PipelineDefaults.ResolveProbability(request.InitialStage),
                EstimatedCloseDate = DateTime.UtcNow.AddDays(30),
                Stage = request.InitialStage,
                Status = PipelineDefaults.ResolveStatus(request.InitialStage),
                Priority = request.Priority,
                LeadId = lead.Id,
                CustomerId = targetCustomerId,
                OwnerUserId = request.OwnerUserId ?? lead.OwnerUserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedBy = currentUserService.UserName,
                UpdatedBy = currentUserService.UserName
            };
            await dbContext.Opportunities.AddAsync(opportunity, cancellationToken);

            if (request.InitialStage != OpportunityStageType.Prospecting)
            {
                await dbContext.OpportunityStageHistories.AddAsync(new OpportunityStageHistory
                {
                    TenantId = tenantId,
                    OpportunityId = opportunity.Id,
                    OldStage = OpportunityStageType.Prospecting,
                    NewStage = request.InitialStage,
                    ChangedAt = DateTime.UtcNow,
                    ChangedByUserId = currentUserService.UserId,
                    Note = "Initial stage set during lead conversion.",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    CreatedBy = currentUserService.UserName,
                    UpdatedBy = currentUserService.UserName
                }, cancellationToken);
            }
        }

        if (customer is not null)
            lead.ConvertedCustomerId = customer.Id;

        lead.Status = LeadStatusType.Won;
        lead.UpdatedAt = DateTime.UtcNow;
        lead.UpdatedBy = currentUserService.UserName;

        await dbContext.SaveChangesAsync(cancellationToken);

        return new LeadConversionResultDto(
            lead.Id,
            customer?.Id ?? request.ExistingCustomerId,
            opportunity?.Id,
            lead.Status,
            "Lead conversion completed successfully.");
    }
}
