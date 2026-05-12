using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record MarkDealWonCommand(Guid DealId, DateTime? OccurredAt, string? Note, string? RowVersion) : IRequest;