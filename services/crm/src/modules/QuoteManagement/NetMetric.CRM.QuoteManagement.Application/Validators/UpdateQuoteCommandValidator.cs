using NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;
using FluentValidation;

namespace NetMetric.CRM.QuoteManagement.Application.Validators;

public sealed class CreateQuoteCommandValidator : AbstractValidator<CreateQuoteCommand>
{
    public CreateQuoteCommandValidator()
    {
        AddCommonRules();
    }

    private void AddCommonRules()
    {
        RuleFor(x => x.QuoteNumber).NotEmpty().MaximumLength(64);
        RuleFor(x => x.CurrencyCode).NotEmpty().Length(3);
        RuleFor(x => x.ExchangeRate).GreaterThan(0);
        RuleFor(x => x.Items).NotEmpty();

        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(x => x.ProductId).NotEmpty();
            item.RuleFor(x => x.Quantity).GreaterThan(0);
            item.RuleFor(x => x.UnitPrice).GreaterThanOrEqualTo(0);
            item.RuleFor(x => x.DiscountRate).InclusiveBetween(0, 100);
            item.RuleFor(x => x.TaxRate).InclusiveBetween(0, 100);
        });
    }
}