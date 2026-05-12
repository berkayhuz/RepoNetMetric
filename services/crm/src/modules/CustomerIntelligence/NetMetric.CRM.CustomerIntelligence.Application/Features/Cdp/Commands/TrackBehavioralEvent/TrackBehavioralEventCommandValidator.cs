using FluentValidation;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Cdp.Commands.TrackBehavioralEvent;

public sealed class TrackBehavioralEventCommandValidator : AbstractValidator<TrackBehavioralEventCommand>
{
    public TrackBehavioralEventCommandValidator()
    {
        RuleFor(x => x.Source).NotEmpty().MaximumLength(64);
        RuleFor(x => x.EventName).NotEmpty().MaximumLength(128);
        RuleFor(x => x.SubjectType).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Channel).MaximumLength(64);
    }
}
