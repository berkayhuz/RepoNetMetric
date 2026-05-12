namespace NetMetric.CRM.QuoteManagement.Contracts.DTOs;

public sealed record ProductRuleDto(
    Guid Id,
    string Name,
    string RuleType,
    Guid? TriggerProductId,
    Guid? TargetProductId,
    int? MinimumQuantity,
    decimal? MaximumDiscountRate,
    string Severity,
    string Message,
    string? CriteriaJson,
    bool IsActive,
    string RowVersion);
