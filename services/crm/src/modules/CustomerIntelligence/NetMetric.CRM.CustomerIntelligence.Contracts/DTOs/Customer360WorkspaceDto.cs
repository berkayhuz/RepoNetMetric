namespace NetMetric.CRM.CustomerIntelligence.Contracts.DTOs;

public sealed record Customer360WorkspaceDto(
    Guid CustomerId,
    IReadOnlyList<Customer360ActivityDto> ActivityStream,
    IReadOnlyList<RelationshipEdgeDto> RelationshipGraph,
    IReadOnlyList<BehavioralEventDto> RecentBehavioralEvents,
    IReadOnlyList<IdentityResolutionDto> LinkedIdentities);
