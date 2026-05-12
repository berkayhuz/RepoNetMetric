using NetMetric.CRM.QuoteManagement.Application.Common;
using NetMetric.CRM.QuoteManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.QuoteManagement.Application.Commands.Quotes;

public sealed record UpsertProductBundleCommand(
    Guid? ProductBundleId,
    string Code,
    string Name,
    string? Description,
    string? Segment,
    string? Industry,
    decimal DiscountRate,
    decimal? MinimumBudget,
    IReadOnlyList<ProductBundleLineInput> Items,
    string? RowVersion) : IRequest<ProductBundleDto>;
