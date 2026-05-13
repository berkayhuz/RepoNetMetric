using MediatR;
using NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Customer360.Commands.UpsertRelationship;

public sealed record UpsertRelationshipCommand(
    string SourceEntityType,
    Guid SourceEntityId,
    string TargetEntityType,
    Guid TargetEntityId,
    string Name,
    string RelationshipType,
    decimal StrengthScore,
    bool IsBidirectional,
    string? DataJson) : IRequest<RelationshipEdgeDto>;
