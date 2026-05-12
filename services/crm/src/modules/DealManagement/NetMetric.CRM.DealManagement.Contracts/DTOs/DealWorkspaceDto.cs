namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record DealWorkspaceDto(DealDetailDto Deal, IReadOnlyList<LostReasonDto> LostReasons, IReadOnlyList<DealOutcomeHistoryDto> Timeline);