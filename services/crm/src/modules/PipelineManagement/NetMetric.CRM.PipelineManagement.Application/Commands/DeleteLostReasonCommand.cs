using MediatR;

namespace NetMetric.CRM.PipelineManagement.Application.Commands;

public sealed record DeleteLostReasonCommand(Guid LostReasonId) : IRequest;
