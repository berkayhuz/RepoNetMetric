using FluentValidation;
using NetMetric.CRM.TicketWorkflowManagement.Application.Commands.StatusHistory.RecordTicketStatusChange;

namespace NetMetric.CRM.TicketWorkflowManagement.Application.Validators;

public sealed class RecordTicketStatusChangeCommandValidator : AbstractValidator<RecordTicketStatusChangeCommand>
{
    public RecordTicketStatusChangeCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
        RuleFor(x => x.PreviousStatus).NotEmpty().MaximumLength(64);
        RuleFor(x => x.NewStatus).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Note).MaximumLength(1000);
    }
}
