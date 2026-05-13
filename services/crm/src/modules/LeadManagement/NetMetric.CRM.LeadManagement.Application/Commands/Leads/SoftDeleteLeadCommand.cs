using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record SoftDeleteLeadCommand(Guid LeadId) : IRequest<Unit>;
