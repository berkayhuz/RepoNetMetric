using FluentValidation;

namespace NetMetric.CRM.QuoteManagement.Application.Validators;

public sealed class ProposalTemplateValidator : AbstractValidator<NetMetric.CRM.QuoteManagement.Application.Commands.ProposalTemplates.CreateProposalTemplateCommand>
{
    public ProposalTemplateValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
        RuleFor(x => x.BodyTemplate).NotEmpty();
    }
}
