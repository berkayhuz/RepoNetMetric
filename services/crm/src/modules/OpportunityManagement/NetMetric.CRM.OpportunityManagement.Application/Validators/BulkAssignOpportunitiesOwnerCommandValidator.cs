using FluentValidation;
using NetMetric.CRM.OpportunityManagement.Application.Features.Bulk.Commands.BulkAssignOpportunitiesOwner;

namespace NetMetric.CRM.OpportunityManagement.Application.Validators;

public sealed class BulkAssignOpportunitiesOwnerCommandValidator : AbstractValidator<BulkAssignOpportunitiesOwnerCommand>
{
    public BulkAssignOpportunitiesOwnerCommandValidator() => RuleFor(x => x.OpportunityIds).NotEmpty();
}
