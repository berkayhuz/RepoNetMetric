using FluentValidation;
using NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Assignments.AssignTicketToQueue;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Validators;

public sealed class AssignTicketToQueueCommandValidator : AbstractValidator<AssignTicketToQueueCommand>
{
    public AssignTicketToQueueCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
        RuleFor(x => x.NewQueueId).NotEmpty();
        RuleFor(x => x.Reason).MaximumLength(500);
    }
}
