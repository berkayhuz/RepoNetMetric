namespace NetMetric.CRM.DealManagement.Contracts.DTOs;

public sealed record WinLossSummaryDto(int TotalDeals, int WonDeals, int LostDeals, decimal WonAmount, decimal LostAmount, IReadOnlyList<LostReasonBreakdownDto> LostReasonBreakdown);
