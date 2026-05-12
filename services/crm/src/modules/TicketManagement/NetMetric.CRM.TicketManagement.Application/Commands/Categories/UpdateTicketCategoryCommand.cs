using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Categories;

public sealed record UpdateTicketCategoryCommand(Guid TicketCategoryId, string Name, string? Description, Guid? ParentCategoryId) : IRequest<TicketCategoryDto>;