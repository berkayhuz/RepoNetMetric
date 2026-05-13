using FluentValidation;

namespace NetMetric.CRM.DocumentManagement.Application.Features.Approvals.Commands.SubmitDocumentReview;

public sealed class SubmitDocumentReviewCommandValidator : AbstractValidator<SubmitDocumentReviewCommand>
{
    public SubmitDocumentReviewCommandValidator()
    {
        RuleFor(x => x.DocumentId).NotEmpty();
        RuleFor(x => x.ReviewType).NotEmpty().MaximumLength(200);
    }
}
