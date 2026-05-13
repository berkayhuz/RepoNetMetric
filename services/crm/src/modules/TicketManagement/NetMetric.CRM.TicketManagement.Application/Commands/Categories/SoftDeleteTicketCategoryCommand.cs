using MediatR;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Categories;

public sealed record SoftDeleteTicketCategoryCommand(Guid TicketCategoryId) : IRequest;
