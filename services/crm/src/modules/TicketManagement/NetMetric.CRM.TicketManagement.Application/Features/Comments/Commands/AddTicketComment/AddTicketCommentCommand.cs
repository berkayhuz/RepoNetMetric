using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Features.Comments.Commands.AddTicketComment;

public sealed record AddTicketCommentCommand(Guid TicketId, string Comment, bool IsInternal) : IRequest<TicketCommentDto>;
