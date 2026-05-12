using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Queries;

public record GetPipelineByIdQuery(Guid Id) : IRequest<PipelineDto>;
