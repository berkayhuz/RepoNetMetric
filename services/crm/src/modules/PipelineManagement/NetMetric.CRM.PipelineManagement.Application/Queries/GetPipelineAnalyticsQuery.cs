using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Queries;

public record GetPipelineAnalyticsQuery(Guid PipelineId) : IRequest<PipelineAnalyticsDto>;
