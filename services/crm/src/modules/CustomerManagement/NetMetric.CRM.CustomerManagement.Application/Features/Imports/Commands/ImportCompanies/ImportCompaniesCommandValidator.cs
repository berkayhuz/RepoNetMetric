using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Features.Imports.Commands.ImportCompanies;

public sealed class ImportCompaniesCommandValidator : AbstractValidator<ImportCompaniesCommand>
{
    public ImportCompaniesCommandValidator()
    {
        RuleFor(x => x.CsvContent)
            .NotEmpty()
            .MaximumLength(2_000_000);

        RuleFor(x => x.Separator)
            .Must(x => x is ',' or ';' or '\t')
            .WithMessage("Separator must be ',', ';' or tab.");

        RuleFor(x => x.IdempotencyKey)
            .MaximumLength(200)
            .When(x => !string.IsNullOrWhiteSpace(x.IdempotencyKey));
    }
}
