using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public sealed record UpdateLostReasonCommand(Guid LostReasonId, string Name, string? Description, bool IsDefault, string? RowVersion) : IRequest<LostReasonDto>;
