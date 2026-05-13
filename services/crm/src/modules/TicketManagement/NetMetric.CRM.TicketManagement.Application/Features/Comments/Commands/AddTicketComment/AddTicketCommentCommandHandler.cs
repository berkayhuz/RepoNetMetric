using MediatR;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Features.Comments.Commands.AddTicketComment;

public sealed class AddTicketCommentCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<AddTicketCommentCommand, TicketCommentDto>
{
    public Task<TicketCommentDto> Handle(AddTicketCommentCommand request, CancellationToken cancellationToken)
        => administrationService.AddCommentAsync(request, cancellationToken);
}
