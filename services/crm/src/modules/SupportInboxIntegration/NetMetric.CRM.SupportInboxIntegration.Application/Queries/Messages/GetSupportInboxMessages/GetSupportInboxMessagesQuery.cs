using MediatR;
using NetMetric.CRM.SupportInboxIntegration.Contracts.DTOs;
using NetMetric.Pagination;

namespace NetMetric.CRM.SupportInboxIntegration.Application.Queries.Messages.GetSupportInboxMessages;

public sealed record GetSupportInboxMessagesQuery(Guid? ConnectionId, bool? LinkedToTicket, int Page, int PageSize) : IRequest<PagedResult<SupportInboxMessageDto>>;
