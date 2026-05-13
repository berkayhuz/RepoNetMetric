using MediatR;
using NetMetric.CRM.ArtificialIntelligence.Contracts.DTOs;

namespace NetMetric.CRM.ArtificialIntelligence.Application.Queries.GetAiWorkspaceOverview;

public sealed record GetAiWorkspaceOverviewQuery : IRequest<AiWorkspaceOverviewDto>;
