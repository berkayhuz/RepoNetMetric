using FluentValidation;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Versions.Commands.AddDocumentVersion;

public sealed class AddDocumentVersionCommandValidator : AbstractValidator<AddDocumentVersionCommand>
{
    public AddDocumentVersionCommandValidator()
    {
        RuleFor(x => x.DocumentId).NotEmpty();
        RuleFor(x => x.FileName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.StorageKey).NotEmpty().MaximumLength(200);
    }
}
