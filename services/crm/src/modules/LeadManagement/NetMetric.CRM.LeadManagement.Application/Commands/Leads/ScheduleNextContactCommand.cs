using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record ScheduleNextContactCommand(Guid LeadId, DateTime? NextContactDate) : IRequest<Unit>;
