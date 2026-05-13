using NetMetric.CRM.SalesForecasting.Contracts.Enums;

namespace NetMetric.CRM.SalesForecasting.Contracts.DTOs;

public sealed record OpportunityForecastRowDto(
    Guid OpportunityId,
    string OpportunityCode,
    string Name,
    Guid? OwnerUserId,
    DateTime? EstimatedCloseDate,
    decimal EstimatedAmount,
    decimal Probability,
    ForecastBucketType Bucket,
    decimal WeightedAmount);
