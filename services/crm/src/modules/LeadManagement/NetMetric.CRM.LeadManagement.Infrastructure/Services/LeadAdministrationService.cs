// <copyright file="LeadAdministrationService.cs" company="NetMetric">
// Copyright (c) 2026 NetMetric. All rights reserved.
// NetMetric is proprietary software. See the LICENSE file in the repository root.
// </copyright>

using Microsoft.EntityFrameworkCore;
using NetMetric.Clock;
using NetMetric.CRM.Core;
using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using NetMetric.CRM.LeadManagement.Application.Commands.Leads;
using NetMetric.CRM.LeadManagement.Application.Common;
using NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkAssignLeadsOwner;
using NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkSoftDeleteLeads;
using NetMetric.CRM.LeadManagement.Application.Features.Conversions.Commands.ConvertLeadToCustomer;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using NetMetric.CRM.LeadManagement.Domain.Common;
using NetMetric.CRM.LeadManagement.Infrastructure.Persistence;
using NetMetric.CRM.Sales;
using NetMetric.CRM.Types;
using NetMetric.CurrentUser;
using NetMetric.Exceptions;

namespace NetMetric.CRM.LeadManagement.Infrastructure.Services;

public sealed class LeadAdministrationService(
    LeadManagementDbContext dbContext,
    ICurrentUserService currentUserService,
    IClock clock) : ILeadAdministrationService
{
    public async Task<LeadDetailDto> CreateAsync(CreateLeadCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var tenantId = currentUserService.TenantId;
        var actor = ResolveActor();

        var lead = new Lead
        {
            TenantId = tenantId,
            LeadCode = LeadManagementMappingExtensions.GenerateLeadCode(),
            FullName = request.FullName.Trim(),
            CompanyName = Normalize(request.CompanyName),
            Email = Normalize(request.Email),
            Phone = Normalize(request.Phone),
            JobTitle = Normalize(request.JobTitle),
            Description = Normalize(request.Description),
            EstimatedBudget = request.EstimatedBudget,
            NextContactDate = request.NextContactDate,
            Source = request.Source,
            Status = request.Status,
            Priority = request.Priority,
            CompanyId = request.CompanyId,
            OwnerUserId = request.OwnerUserId,
            CreatedAt = clock.UtcDateTime,
            UpdatedAt = clock.UtcDateTime,
            CreatedBy = actor,
            UpdatedBy = actor
        };

        lead.SetNotes(request.Notes);

        dbContext.Leads.Add(lead);
        await dbContext.SaveChangesAsync(cancellationToken);

        return lead.ToDetailDto([]);
    }

    public async Task<LeadDetailDto> UpdateAsync(UpdateLeadCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);
        ConcurrencyHelper.ApplyRowVersion(dbContext, lead, request.RowVersion);

        lead.FullName = request.FullName.Trim();
        lead.CompanyName = Normalize(request.CompanyName);
        lead.Email = Normalize(request.Email);
        lead.Phone = Normalize(request.Phone);
        lead.JobTitle = Normalize(request.JobTitle);
        lead.Description = Normalize(request.Description);
        lead.EstimatedBudget = request.EstimatedBudget;
        lead.NextContactDate = request.NextContactDate;
        lead.Source = request.Source;
        lead.Status = request.Status;
        lead.Priority = request.Priority;
        lead.CompanyId = request.CompanyId;
        lead.OwnerUserId = request.OwnerUserId;
        lead.SetNotes(request.Notes);
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        if (request.Status is LeadStatusType.Lost or LeadStatusType.Archived)
            lead.Deactivate();
        else
            lead.Activate();

        await dbContext.SaveChangesAsync(cancellationToken);

        var scores = await dbContext.LeadScores
            .AsNoTracking()
            .Where(x => x.TenantId == lead.TenantId && x.LeadId == lead.Id)
            .OrderByDescending(x => x.CalculatedAt)
            .ToListAsync(cancellationToken);

        return lead.ToDetailDto(scores);
    }

    public async Task ChangeStatusAsync(ChangeLeadStatusCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);
        lead.Status = request.Status;
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        if (request.Status is LeadStatusType.Lost or LeadStatusType.Archived)
            lead.Deactivate();
        else
            lead.Activate();

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task AssignOwnerAsync(AssignLeadOwnerCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);
        lead.OwnerUserId = request.OwnerUserId;
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task ScheduleNextContactAsync(ScheduleNextContactCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);
        lead.NextContactDate = request.NextContactDate;
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<LeadScoreDto> UpsertScoreAsync(UpsertLeadScoreCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);

        var score = new LeadScore
        {
            TenantId = lead.TenantId,
            LeadId = lead.Id,
            Score = request.Score,
            ScoreReason = Normalize(request.ScoreReason),
            CalculatedAt = clock.UtcDateTime,
            CreatedAt = clock.UtcDateTime,
            UpdatedAt = clock.UtcDateTime,
            CreatedBy = ResolveActor(),
            UpdatedBy = ResolveActor()
        };

        dbContext.LeadScores.Add(score);

        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        await dbContext.SaveChangesAsync(cancellationToken);

        return score.ToDto();
    }

    public async Task SoftDeleteAsync(SoftDeleteLeadCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);
        dbContext.Leads.Remove(lead);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> BulkAssignOwnerAsync(BulkAssignLeadsOwnerCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();
        var tenantId = currentUserService.TenantId;

        var leads = await dbContext.Leads
            .Where(x => x.TenantId == tenantId && request.LeadIds.Contains(x.Id))
            .ToListAsync(cancellationToken);

        foreach (var lead in leads)
        {
            lead.OwnerUserId = request.OwnerUserId;
            lead.UpdatedAt = clock.UtcDateTime;
            lead.UpdatedBy = ResolveActor();
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return leads.Count;
    }

    public async Task<int> BulkSoftDeleteAsync(BulkSoftDeleteLeadsCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();
        var tenantId = currentUserService.TenantId;

        var leads = await dbContext.Leads
            .Where(x => x.TenantId == tenantId && request.LeadIds.Contains(x.Id))
            .ToListAsync(cancellationToken);

        dbContext.Leads.RemoveRange(leads);
        await dbContext.SaveChangesAsync(cancellationToken);

        return leads.Count;
    }

    public async Task<LeadConversionResultDto> ConvertToCustomerAsync(ConvertLeadToCustomerCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);

        if (lead.ConvertedCustomerId.HasValue)
            throw new ConflictAppException("Lead is already converted.");

        var (firstName, lastName) = LeadManagementMappingExtensions.SplitName(lead.FullName);

        var customer = new Customer
        {
            TenantId = lead.TenantId,
            FirstName = firstName,
            LastName = lastName,
            Email = lead.Email,
            MobilePhone = lead.Phone,
            JobTitle = lead.JobTitle,
            Description = lead.Description,
            OwnerUserId = lead.OwnerUserId,
            CompanyId = request.CompanyId ?? lead.CompanyId,
            CustomerType = request.CustomerType,
            IsVip = request.MarkCustomerAsVip,
            CreatedAt = clock.UtcDateTime,
            UpdatedAt = clock.UtcDateTime,
            CreatedBy = ResolveActor(),
            UpdatedBy = ResolveActor()
        };

        customer.SetNotes(lead.Notes);

        dbContext.Customers.Add(customer);

        Opportunity? opportunity = null;

        if (request.CreateOpportunity)
        {
            opportunity = new Opportunity
            {
                TenantId = lead.TenantId,
                OpportunityCode = LeadManagementMappingExtensions.GenerateOpportunityCode(),
                Name = Normalize(request.OpportunityName) ?? $"{lead.FullName} Opportunity",
                Description = lead.Description,
                EstimatedAmount = request.EstimatedAmount ?? lead.EstimatedBudget ?? 0m,
                ExpectedRevenue = request.EstimatedAmount ?? lead.EstimatedBudget,
                Probability = LeadConversionDefaults.DefaultOpportunityProbability,
                EstimatedCloseDate = lead.NextContactDate?.AddDays(30),
                Stage = OpportunityStageType.Prospecting,
                Status = OpportunityStatusType.Open,
                Priority = lead.Priority,
                LeadId = lead.Id,
                OwnerUserId = lead.OwnerUserId,
                CustomerId = customer.Id,
                CreatedAt = clock.UtcDateTime,
                UpdatedAt = clock.UtcDateTime,
                CreatedBy = ResolveActor(),
                UpdatedBy = ResolveActor()
            };

            opportunity.SetNotes($"Created from lead {lead.LeadCode}.");
            dbContext.Opportunities.Add(opportunity);
        }

        lead.ConvertedCustomerId = customer.Id;
        lead.Status = LeadStatusType.Won;
        lead.Deactivate();
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        await dbContext.SaveChangesAsync(cancellationToken);

        return new LeadConversionResultDto(
            lead.Id,
            customer.Id,
            opportunity?.Id,
            lead.Status.ToString());
    }

    public async Task UpsertQualificationAsync(UpsertLeadQualificationCommand request, CancellationToken cancellationToken)
    {
        currentUserService.EnsureAuthenticated();

        var lead = await GetLeadForWriteAsync(request.LeadId, cancellationToken);

        lead.QualificationFramework = request.FrameworkType;
        lead.QualificationData = request.QualificationDataJson;
        lead.UpdatedAt = clock.UtcDateTime;
        lead.UpdatedBy = ResolveActor();

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task<Lead> GetLeadForWriteAsync(Guid leadId, CancellationToken cancellationToken)
    {
        var tenantId = currentUserService.TenantId;

        var lead = await dbContext.Leads
            .FirstOrDefaultAsync(x => x.TenantId == tenantId && x.Id == leadId, cancellationToken);

        return lead ?? throw new NotFoundAppException("Lead not found.");
    }

    private string ResolveActor()
        => currentUserService.UserName ?? currentUserService.Email ?? "system";

    private static string? Normalize(string? value)
        => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
