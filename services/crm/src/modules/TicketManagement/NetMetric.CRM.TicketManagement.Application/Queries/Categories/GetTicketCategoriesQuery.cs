using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Queries.Categories;

public sealed record GetTicketCategoriesQuery(bool IncludeInactive = false) : IRequest<IReadOnlyList<TicketCategoryDto>>;
