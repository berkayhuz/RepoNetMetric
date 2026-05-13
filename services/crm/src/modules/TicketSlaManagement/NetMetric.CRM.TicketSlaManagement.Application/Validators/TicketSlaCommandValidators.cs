using FluentValidation;
using NetMetric.CRM.TicketSlaManagement.Application.Commands.TicketSla;

namespace NetMetric.CRM.TicketSlaManagement.Application.Validators;

public sealed class AttachSlaToTicketCommandValidator : AbstractValidator<AttachSlaToTicketCommand>
{
    public AttachSlaToTicketCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
        RuleFor(x => x.SlaPolicyId).NotEmpty();
    }
}

public sealed class MarkFirstResponseCommandValidator : AbstractValidator<MarkFirstResponseCommand>
{
    public MarkFirstResponseCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
    }
}

public sealed class MarkResolvedCommandValidator : AbstractValidator<MarkResolvedCommand>
{
    public MarkResolvedCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
    }
}
