using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using NetMetric.CRM.Types;
using NetMetric.Pagination;

namespace NetMetric.CRM.TicketManagement.Application.Queries.Tickets;

public sealed record GetTicketsQuery(
    string? Search,
    TicketStatusType? Status,
    PriorityType? Priority,
    Guid? AssignedUserId,
    Guid? CustomerId,
    bool? IsActive,
    int Page,
    int PageSize) : IRequest<PagedResult<TicketListItemDto>>;
