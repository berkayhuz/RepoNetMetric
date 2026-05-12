using FluentValidation;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Documents.Commands.CreateDocument;

public sealed class CreateDocumentCommandValidator : AbstractValidator<CreateDocumentCommand>
{
    public CreateDocumentCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.ContentType).NotEmpty().MaximumLength(200);
    }
}
