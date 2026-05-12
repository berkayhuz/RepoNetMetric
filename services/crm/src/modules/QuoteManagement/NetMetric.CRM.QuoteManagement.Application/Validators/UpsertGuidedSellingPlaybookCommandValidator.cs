using NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;
using FluentValidation;

namespace NetMetric.CRM.QuoteManagement.Application.Validators;

public sealed class UpsertGuidedSellingPlaybookCommandValidator : AbstractValidator<UpsertGuidedSellingPlaybookCommand>
{
    public UpsertGuidedSellingPlaybookCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
        RuleFor(x => x.MaximumBudget)
            .GreaterThanOrEqualTo(x => x.MinimumBudget!.Value)
            .When(x => x.MinimumBudget.HasValue && x.MaximumBudget.HasValue);
        RuleFor(x => x.RecommendedBundleCodes).NotEmpty();
    }
}
