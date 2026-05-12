using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record ReopenDealCommand(Guid DealId, string? Note, string? RowVersion) : IRequest;