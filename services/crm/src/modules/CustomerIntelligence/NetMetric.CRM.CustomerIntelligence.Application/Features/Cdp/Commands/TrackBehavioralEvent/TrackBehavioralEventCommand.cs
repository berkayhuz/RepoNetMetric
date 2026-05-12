using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Cdp.Commands.TrackBehavioralEvent;

public sealed record TrackBehavioralEventCommand(
    string Source,
    string EventName,
    string SubjectType,
    Guid SubjectId,
    string? IdentityKey,
    string? Channel,
    string? PropertiesJson,
    DateTime? OccurredAtUtc) : IRequest<BehavioralEventDto>;
