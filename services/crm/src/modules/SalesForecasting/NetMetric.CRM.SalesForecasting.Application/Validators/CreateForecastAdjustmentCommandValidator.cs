using NetMetric.CRM.SalesForecasting.Application.Commands;
using FluentValidation;

namespace NetMetric.CRM.SalesForecasting.Application.Validators;

public sealed class CreateForecastAdjustmentCommandValidator : AbstractValidator<CreateForecastAdjustmentCommand>
{
    public CreateForecastAdjustmentCommandValidator()
    {
        RuleFor(x => x.PeriodEnd).GreaterThanOrEqualTo(x => x.PeriodStart);
        RuleFor(x => x.Reason).NotEmpty().MaximumLength(256);
        RuleFor(x => x.Amount).NotEqual(0m);
    }
}