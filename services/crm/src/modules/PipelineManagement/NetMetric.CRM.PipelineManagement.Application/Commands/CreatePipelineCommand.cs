using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public record CreatePipelineCommand(
    string Name,
    string? Description,
    bool IsDefault,
    int DisplayOrder,
    List<CreatePipelineStageRequest> Stages) : IRequest<PipelineDto>;

public record CreatePipelineStageRequest(
    string Name,
    string? Description,
    int DisplayOrder,
    decimal Probability,
    bool IsWinStage,
    bool IsLostStage);
