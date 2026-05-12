using NetMetric.CRM.CustomerManagement.Application.Features.Notes.Commands.UpdateNote;
using FluentValidation;

namespace NetMetric.CRM.CustomerManagement.Application.Validators;

public sealed class UpdateNoteCommandValidator : AbstractValidator<UpdateNoteCommand>
{
    public UpdateNoteCommandValidator()
    {
        RuleFor(x => x.NoteId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Content).NotEmpty().MaximumLength(4000);
    }
}
