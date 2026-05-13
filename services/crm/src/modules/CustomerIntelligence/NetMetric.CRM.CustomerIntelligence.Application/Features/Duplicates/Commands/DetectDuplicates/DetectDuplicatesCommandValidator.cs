using FluentValidation;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Duplicates.Commands.DetectDuplicates;

public sealed class DetectDuplicatesCommandValidator : AbstractValidator<DetectDuplicatesCommand>
{
    public DetectDuplicatesCommandValidator()
    {
        RuleFor(x => x.SubjectId).NotEmpty();
        RuleFor(x => x.EntityType).NotEmpty().MaximumLength(200);
    }
}
