using NetMetric.CRM.ArtificialIntelligence.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.ArtificialIntelligence.Application.Queries.GetAiWorkspaceOverview;

public sealed record GetAiWorkspaceOverviewQuery : IRequest<AiWorkspaceOverviewDto>;
