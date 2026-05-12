namespace NetMetric.CRM.ArtificialIntelligence.Contracts.DTOs;

public sealed record AiProviderConnectionDto(Guid Id, string Name, string Provider, string ModelName, string Endpoint, IReadOnlyList<string> Capabilities, bool IsActive);
