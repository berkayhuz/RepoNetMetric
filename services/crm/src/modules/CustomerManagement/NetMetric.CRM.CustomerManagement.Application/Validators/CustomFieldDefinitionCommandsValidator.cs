using NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.CreateCustomFieldDefinition;
using NetMetric.CRM.CustomerManagement.Application.Features.CustomFields.Commands.UpdateCustomFieldDefinition;
using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class CreateCustomFieldDefinitionCommandValidator : AbstractValidator<CreateCustomFieldDefinitionCommand>
{
    public CreateCustomFieldDefinitionCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Label).NotEmpty().MaximumLength(150);
        RuleFor(x => x.EntityName).NotEmpty().MaximumLength(50);
        RuleFor(x => x.OrderNo).GreaterThanOrEqualTo(0);
    }
}

public sealed class UpdateCustomFieldDefinitionCommandValidator : AbstractValidator<UpdateCustomFieldDefinitionCommand>
{
    public UpdateCustomFieldDefinitionCommandValidator()
    {
        RuleFor(x => x.DefinitionId).NotEmpty();
        RuleFor(x => x.Label).NotEmpty().MaximumLength(150);
        RuleFor(x => x.OrderNo).GreaterThanOrEqualTo(0);
    }
}
