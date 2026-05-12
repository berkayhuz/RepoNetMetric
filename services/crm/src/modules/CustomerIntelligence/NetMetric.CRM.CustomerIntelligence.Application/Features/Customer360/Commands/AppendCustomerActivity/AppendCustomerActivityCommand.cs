using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Customer360.Commands.AppendCustomerActivity;

public sealed record AppendCustomerActivityCommand(
    string SubjectType,
    Guid SubjectId,
    string Name,
    string Category,
    string? Channel,
    string? EntityType,
    Guid? RelatedEntityId,
    string? DataJson,
    DateTime? OccurredAtUtc) : IRequest<Customer360ActivityDto>;
