using NetMetric.CRM.LeadManagement.Application.Commands.Leads;
using FluentValidation;

namespace NetMetric.CRM.LeadManagement.Application.Validators;

public sealed class UpdateLeadCommandValidator : AbstractValidator<UpdateLeadCommand>
{
    public UpdateLeadCommandValidator()
    {
        RuleFor(x => x.LeadId).NotEmpty();
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.CompanyName).MaximumLength(200);
        RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email));
        RuleFor(x => x.Phone).MaximumLength(50);
        RuleFor(x => x.JobTitle).MaximumLength(128);
        RuleFor(x => x.EstimatedBudget).GreaterThanOrEqualTo(0).When(x => x.EstimatedBudget.HasValue);
    }
}
