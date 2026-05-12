using NetMetric.CRM.TicketWorkflowManagement.Application.Commands.Queues.CreateTicketQueue;
using FluentValidation;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Validators;

public sealed class CreateTicketQueueCommandValidator : AbstractValidator<CreateTicketQueueCommand>
{
    public CreateTicketQueueCommandValidator()
    {
        RuleFor(x => x.Code).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
        RuleFor(x => x.Description).MaximumLength(1000);
    }
}
