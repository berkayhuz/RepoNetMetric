using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Queries;

public sealed record GetLostReasonsQuery() : IRequest<IReadOnlyList<LostReasonDto>>;
