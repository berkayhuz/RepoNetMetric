using NetMetric.CRM.SupportInboxIntegration.Application.Commands.Rules.CreateSupportInboxRule;
using FluentValidation;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Validators;

public sealed class CreateSupportInboxRuleCommandValidator : AbstractValidator<CreateSupportInboxRuleCommand>
{
    public CreateSupportInboxRuleCommandValidator()
    {
        RuleFor(x => x.ConnectionId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(120);
    }
}
