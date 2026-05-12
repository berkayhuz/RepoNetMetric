using NetMetric.CRM.LeadManagement.Application.Features.Conversions.Commands.ConvertLeadToCustomer;
using FluentValidation;

namespace NetMetric.CRM.LeadManagement.Application.Validators;

public sealed class ConvertLeadToCustomerCommandValidator : AbstractValidator<ConvertLeadToCustomerCommand>
{
    public ConvertLeadToCustomerCommandValidator()
    {
        RuleFor(x => x.LeadId).NotEmpty();
        RuleFor(x => x.OpportunityName)
            .MaximumLength(200)
            .When(x => !string.IsNullOrWhiteSpace(x.OpportunityName));

        RuleFor(x => x.EstimatedAmount)
            .GreaterThanOrEqualTo(0)
            .When(x => x.EstimatedAmount.HasValue);
    }
}
