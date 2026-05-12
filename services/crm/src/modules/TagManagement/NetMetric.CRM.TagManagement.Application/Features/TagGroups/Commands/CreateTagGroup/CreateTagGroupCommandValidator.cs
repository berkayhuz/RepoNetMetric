using FluentValidation;

namespace NetMetric.CRM.TagManagement.Application.Features.TagGroups.Commands.CreateTagGroup;

public sealed class CreateTagGroupCommandValidator : AbstractValidator<CreateTagGroupCommand>
{
    public CreateTagGroupCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}
