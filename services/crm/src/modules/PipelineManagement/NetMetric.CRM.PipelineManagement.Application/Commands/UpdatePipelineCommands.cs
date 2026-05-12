using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public record UpdatePipelineCommand(
    Guid Id,
    string Name,
    string? Description,
    bool IsDefault,
    int DisplayOrder,
    List<UpdatePipelineStageRequest> Stages,
    string RowVersion) : IRequest<PipelineDto>;

public record UpdatePipelineStageRequest(
    Guid? Id,
    string Name,
    string? Description,
    int DisplayOrder,
    decimal Probability,
    bool IsWinStage,
    bool IsLostStage);

public record DeletePipelineCommand(Guid Id) : IRequest;
