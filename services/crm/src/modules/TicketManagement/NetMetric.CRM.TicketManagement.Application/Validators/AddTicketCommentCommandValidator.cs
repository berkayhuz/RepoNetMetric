using NetMetric.CRM.TicketManagement.Application.Features.Comments.Commands.AddTicketComment;
using FluentValidation;

namespace NetMetric.CRM.TicketManagement.Application.Validators;

public sealed class AddTicketCommentCommandValidator : AbstractValidator<AddTicketCommentCommand>
{
    public AddTicketCommentCommandValidator()
    {
        RuleFor(x => x.TicketId).NotEmpty();
        RuleFor(x => x.Comment).NotEmpty().MaximumLength(4000);
    }
}
