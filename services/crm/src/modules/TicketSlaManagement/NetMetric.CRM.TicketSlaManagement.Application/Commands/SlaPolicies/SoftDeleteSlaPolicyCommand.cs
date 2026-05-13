using MediatR;

namespace NetMetric.CRM.TicketSlaManagement.Application.Commands.SlaPolicies;

public sealed record SoftDeleteSlaPolicyCommand(Guid Id) : IRequest;
