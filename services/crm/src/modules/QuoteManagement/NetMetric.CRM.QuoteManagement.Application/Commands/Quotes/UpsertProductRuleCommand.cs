using MediatR;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record UpsertProductRuleCommand(
    Guid? ProductRuleId,
    string Name,
    string RuleType,
    Guid? TriggerProductId,
    Guid? TargetProductId,
    int? MinimumQuantity,
    decimal? MaximumDiscountRate,
    string Severity,
    string Message,
    string? CriteriaJson,
    string? RowVersion) : IRequest<ProductRuleDto>;
