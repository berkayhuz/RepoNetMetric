using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Queries;

public record GetPipelinesQuery() : IRequest<List<PipelineSummaryDto>>;
