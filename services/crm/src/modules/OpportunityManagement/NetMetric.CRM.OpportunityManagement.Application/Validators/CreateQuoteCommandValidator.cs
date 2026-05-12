using FluentValidation;

namespace NetMetric.CRM.OpportunityManagement.Application.Validators;

public sealed class CreateQuoteCommandValidator : AbstractValidator<NetMetric.CRM.OpportunityManagement.Application.Features.Quotes.Commands.CreateQuote.CreateQuoteCommand>
{
    public CreateQuoteCommandValidator()
    {
        RuleFor(x => x.OpportunityId).NotEmpty();
        RuleFor(x => x.QuoteNumber).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Items).NotEmpty();
        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(x => x.ProductId).NotEmpty();
            item.RuleFor(x => x.Quantity).GreaterThan(0);
            item.RuleFor(x => x.UnitPrice).GreaterThanOrEqualTo(0);
        });
    }
}