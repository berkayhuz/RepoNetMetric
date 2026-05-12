using MediatR;
using NetMetric.CRM.Types;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Tickets;

public sealed record UpdateTicketCommand(Guid TicketId, string Subject, string? Description, TicketType TicketType, TicketChannelType Channel, PriorityType Priority, Guid? AssignedUserId, Guid? CustomerId, Guid? ContactId, Guid? TicketCategoryId, Guid? SlaPolicyId, DateTime? FirstResponseDueAt, DateTime? ResolveDueAt, string? Notes, byte[]? RowVersion) : IRequest<TicketDetailDto>;