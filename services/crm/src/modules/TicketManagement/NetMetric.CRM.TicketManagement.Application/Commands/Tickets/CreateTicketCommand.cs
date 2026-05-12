using MediatR;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;
using NetMetric.CRM.Types;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record CreateTicketCommand(string Subject, string? Description, TicketType TicketType, TicketChannelType Channel, PriorityType Priority, Guid? AssignedUserId, Guid? CustomerId, Guid? ContactId, Guid? TicketCategoryId, Guid? SlaPolicyId, DateTime? FirstResponseDueAt, DateTime? ResolveDueAt, string? Notes) : IRequest<TicketDetailDto>;
