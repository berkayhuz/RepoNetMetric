using FluentValidation;

namespace NetMetric.CRM.TagManagement.Application.Features.Classifications.Commands.CreateClassificationScheme;

public sealed class CreateClassificationSchemeCommandValidator : AbstractValidator<CreateClassificationSchemeCommand>
{
    public CreateClassificationSchemeCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.EntityType).NotEmpty().MaximumLength(200);
    }
}
