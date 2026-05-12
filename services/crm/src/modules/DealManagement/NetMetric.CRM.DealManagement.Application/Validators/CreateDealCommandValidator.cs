using NetMetric.CRM.DealManagement.Application.Commands.Deals;
using FluentValidation;

namespace NetMetric.CRM.DealManagement.Application.Validators;

public sealed class CreateDealCommandValidator : AbstractValidator<CreateDealCommand>
{
    public CreateDealCommandValidator()
    {
        RuleFor(x => x.DealCode).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.TotalAmount).GreaterThanOrEqualTo(0m);
    }
}