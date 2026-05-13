using FluentValidation;

namespace NetMetric.CRM.TagManagement.Application.Features.SmartLabels.Commands.CreateSmartLabelRule;

public sealed class CreateSmartLabelRuleCommandValidator : AbstractValidator<CreateSmartLabelRuleCommand>
{
    public CreateSmartLabelRuleCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.EntityType).NotEmpty().MaximumLength(200);
        RuleFor(x => x.ConditionJson).NotEmpty().MaximumLength(200);
    }
}
