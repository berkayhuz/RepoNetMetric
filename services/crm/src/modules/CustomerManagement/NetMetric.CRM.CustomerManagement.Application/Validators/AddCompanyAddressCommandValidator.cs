using NetMetric.CRM.CustomerManagement.Application.Commands.Addresses;
using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class AddCompanyAddressCommandValidator : AbstractValidator<AddCompanyAddressCommand>
{
    public AddCompanyAddressCommandValidator()
    {
        RuleFor(x => x.CompanyId).NotEmpty();
        RuleFor(x => x.Line1).NotEmpty().MaximumLength(250);
        RuleFor(x => x.Line2).MaximumLength(250);
        RuleFor(x => x.District).MaximumLength(100);
        RuleFor(x => x.City).MaximumLength(100);
        RuleFor(x => x.State).MaximumLength(100);
        RuleFor(x => x.Country).MaximumLength(100);
        RuleFor(x => x.ZipCode).MaximumLength(25);
    }
}
