using MediatR;

namespace NetMetric.CRM.DealManagement.Application.Commands.Deals;

public sealed record MarkDealLostCommand(Guid DealId, DateTime? OccurredAt, Guid? LostReasonId, string? Note, string? RowVersion) : IRequest;