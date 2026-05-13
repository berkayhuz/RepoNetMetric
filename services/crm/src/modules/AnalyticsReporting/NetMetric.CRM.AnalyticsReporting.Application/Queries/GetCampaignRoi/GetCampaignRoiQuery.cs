using MediatR;
using NetMetric.CRM.AnalyticsReporting.Application.DTOs;

namespace NetMetric.CRM.AnalyticsReporting.Application.Queries.GetCampaignRoi;

public sealed record GetCampaignRoiQuery(Guid TenantId) : IRequest<IReadOnlyCollection<CampaignRoiDto>>;
