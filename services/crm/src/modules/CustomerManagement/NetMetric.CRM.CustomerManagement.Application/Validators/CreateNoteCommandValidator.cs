using NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.CreateNote;
using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
{
    public CreateNoteCommandValidator()
    {
        RuleFor(x => x.EntityName).NotEmpty().MaximumLength(50);
        RuleFor(x => x.EntityId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Content).NotEmpty().MaximumLength(4000);
    }
}
