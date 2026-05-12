using NetMetric.CRM.LeadManagement.Application.Commands.Leads;
using FluentValidation;

namespace NetMetric.CRM.LeadManagement.Application.Validators;

public sealed class UpsertLeadScoreCommandValidator : AbstractValidator<UpsertLeadScoreCommand>
{
    public UpsertLeadScoreCommandValidator()
    {
        RuleFor(x => x.LeadId).NotEmpty();
        RuleFor(x => x.Score).InclusiveBetween(0, 100);
        RuleFor(x => x.ScoreReason).MaximumLength(500);
    }
}
