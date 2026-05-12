using NetMetric.CRM.OpportunityManagement.Application.Commands;
using FluentValidation;

namespace NetMetric.CRM.OpportunityManagement.Application.Validators;

public sealed class UpdateOpportunityCommandValidator : AbstractValidator<UpdateOpportunityCommand>
{
    public UpdateOpportunityCommandValidator()
    {
        RuleFor(x => x.OpportunityId).NotEmpty();
        RuleFor(x => x.OpportunityCode).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.RowVersion).NotEmpty();
    }
}