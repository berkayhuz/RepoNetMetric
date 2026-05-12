using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record SoftDeleteDealCommand(Guid DealId) : IRequest;