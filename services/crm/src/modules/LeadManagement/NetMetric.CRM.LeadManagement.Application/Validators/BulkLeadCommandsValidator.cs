using NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkAssignLeadsOwner;
using NetMetric.CRM.LeadManagement.Application.Features.Bulk.Commands.BulkSoftDeleteLeads;
using FluentValidation;

namespace NetMetric.CRM.LeadManagement.Application.Validators;

public sealed class BulkAssignLeadsOwnerCommandValidator : AbstractValidator<BulkAssignLeadsOwnerCommand>
{
    public BulkAssignLeadsOwnerCommandValidator()
    {
        RuleFor(x => x.LeadIds).NotEmpty();
        RuleForEach(x => x.LeadIds).NotEmpty();
    }
}

public sealed class BulkSoftDeleteLeadsCommandValidator : AbstractValidator<BulkSoftDeleteLeadsCommand>
{
    public BulkSoftDeleteLeadsCommandValidator()
    {
        RuleFor(x => x.LeadIds).NotEmpty();
        RuleForEach(x => x.LeadIds).NotEmpty();
    }
}
