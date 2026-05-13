using FluentValidation;
using NetMetric.CRM.TicketSlaManagement.Application.Commands.Escalations;

namespace NetMetric.CRM.TicketSlaManagement.Application.Validators;

public sealed class CreateSlaEscalationRuleCommandValidator : AbstractValidator<CreateSlaEscalationRuleCommand>
{
    public CreateSlaEscalationRuleCommandValidator()
    {
        RuleFor(x => x.SlaPolicyId).NotEmpty();
        RuleFor(x => x.MetricType).NotEmpty();
        RuleFor(x => x.ActionType).NotEmpty();
        RuleFor(x => x.TriggerBeforeOrAfterMinutes).InclusiveBetween(-1440, 1440);
    }
}

public sealed class UpdateSlaEscalationRuleCommandValidator : AbstractValidator<UpdateSlaEscalationRuleCommand>
{
    public UpdateSlaEscalationRuleCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.SlaPolicyId).NotEmpty();
        RuleFor(x => x.MetricType).NotEmpty();
        RuleFor(x => x.ActionType).NotEmpty();
        RuleFor(x => x.TriggerBeforeOrAfterMinutes).InclusiveBetween(-1440, 1440);
    }
}
