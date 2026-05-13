using FluentValidation;
using NetMetric.CRM.DealManagement.Application.Commands.Reviews;

namespace NetMetric.CRM.DealManagement.Application.Validators;

public sealed class UpsertWinLossReviewCommandValidator : AbstractValidator<UpsertWinLossReviewCommand>
{
    public UpsertWinLossReviewCommandValidator()
    {
        RuleFor(x => x.DealId).NotEmpty();
        RuleFor(x => x.Outcome).NotEmpty().MaximumLength(20);
        RuleFor(x => x.CompetitorPrice).GreaterThanOrEqualTo(0m).When(x => x.CompetitorPrice.HasValue);
    }
}
