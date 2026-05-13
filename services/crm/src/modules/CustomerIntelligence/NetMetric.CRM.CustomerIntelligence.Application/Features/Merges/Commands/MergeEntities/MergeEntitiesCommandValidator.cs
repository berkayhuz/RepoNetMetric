using FluentValidation;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Merges.Commands.MergeEntities;

public sealed class MergeEntitiesCommandValidator : AbstractValidator<MergeEntitiesCommand>
{
    public MergeEntitiesCommandValidator()
    {
        RuleFor(x => x.PrimaryEntityType).NotEmpty().MaximumLength(200);
        RuleFor(x => x.PrimaryEntityId).NotEmpty();
        RuleFor(x => x.SecondaryEntityType).NotEmpty().MaximumLength(200);
        RuleFor(x => x.SecondaryEntityId).NotEmpty();
        RuleFor(x => x.Reason).NotEmpty().MaximumLength(200);
    }
}
