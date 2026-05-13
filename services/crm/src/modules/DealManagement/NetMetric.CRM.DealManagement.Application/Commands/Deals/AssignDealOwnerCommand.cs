using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record AssignDealOwnerCommand(Guid DealId, Guid? OwnerUserId) : IRequest;
