using MediatR;
using NetMetric.CRM.MarketingAutomation.Contracts.DTOs;

namespace NetMetric.CRM.MarketingAutomation.Application.Features.Campaigns.Commands.CreateCampaign;

public sealed record CreateCampaignCommand(
    string Code,
    string Name,
    string? Description) : IRequest<MarketingAutomationSummaryDto>;
