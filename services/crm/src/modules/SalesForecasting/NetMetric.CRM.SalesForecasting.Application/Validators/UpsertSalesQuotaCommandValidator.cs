using FluentValidation;
using NetMetric.CRM.SalesForecasting.Application.Commands;

namespace NetMetric.CRM.SalesForecasting.Application.Validators;

public sealed class UpsertSalesQuotaCommandValidator : AbstractValidator<UpsertSalesQuotaCommand>
{
    public UpsertSalesQuotaCommandValidator()
    {
        RuleFor(x => x.PeriodEnd).GreaterThanOrEqualTo(x => x.PeriodStart);
        RuleFor(x => x.Amount).GreaterThanOrEqualTo(0m);
        RuleFor(x => x.CurrencyCode).NotEmpty().MaximumLength(8);
    }
}