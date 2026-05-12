namespace NetMetric.CRM.ArtificialIntelligence.Contracts.DTOs;

public sealed record AiWorkspaceOverviewDto(int ActiveProviderCount, int AutomationPolicyCount, int CompletedRunCount, int FailedRunCount, IReadOnlyList<AiProviderConnectionDto> Providers);
