using MediatR;
using NetMetric.CRM.MarketingAutomation.Contracts.DTOs;

namespace NetMetric.CRM.MarketingAutomation.Application.Features.Campaigns.Queries.GetCampaignById;

public sealed record GetCampaignByIdQuery(Guid Id) : IRequest<MarketingAutomationSummaryDto?>;
