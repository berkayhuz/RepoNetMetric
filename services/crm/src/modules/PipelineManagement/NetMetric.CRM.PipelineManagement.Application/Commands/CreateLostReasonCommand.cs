using MediatR;
using NetMetric.CRM.PipelineManagement.Contracts.DTOs;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public sealed record CreateLostReasonCommand(string Name, string? Description, bool IsDefault) : IRequest<LostReasonDto>;
