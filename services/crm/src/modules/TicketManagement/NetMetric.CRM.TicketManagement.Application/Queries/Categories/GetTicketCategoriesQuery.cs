using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Queries.Categories;

public sealed record GetTicketCategoriesQuery(bool IncludeInactive = false) : IRequest<IReadOnlyList<TicketCategoryDto>>;
