using FluentValidation;
using NetMetric.CRM.QuoteManagement.Application.Queries.Quotes;

namespace NetMetric.CRM.QuoteManagement.Application.Validators;

public sealed class RunGuidedSellingQueryValidator : AbstractValidator<RunGuidedSellingQuery>
{
    public RunGuidedSellingQueryValidator()
    {
        RuleFor(x => x.RequiredCapabilities).Must(x => x.Count <= 20);
    }
}
