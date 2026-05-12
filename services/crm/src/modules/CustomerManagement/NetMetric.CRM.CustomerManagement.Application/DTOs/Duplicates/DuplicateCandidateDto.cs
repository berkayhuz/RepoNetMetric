namespace NetMetric.CRM.CustomerManagement.Application.DTOs.Duplicates;

public sealed class DuplicateCandidateDto
{
    public required string EntityType { get; init; }
    public required Guid PrimaryId { get; init; }
    public required Guid CandidateId { get; init; }
    public required string PrimaryDisplayName { get; init; }
    public required string CandidateDisplayName { get; init; }
    public required string Reason { get; init; }
    public decimal Score { get; init; }
}
