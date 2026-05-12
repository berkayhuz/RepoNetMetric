using NetMetric.CRM.DealManagement.Application.Commands.Deals;
using FluentValidation;

namespace NetMetric.CRM.DealManagement.Application.Validators;

public sealed class UpdateDealCommandValidator : AbstractValidator<UpdateDealCommand>
{
    public UpdateDealCommandValidator()
    {
        RuleFor(x => x.DealId).NotEmpty();
        RuleFor(x => x.DealCode).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}
