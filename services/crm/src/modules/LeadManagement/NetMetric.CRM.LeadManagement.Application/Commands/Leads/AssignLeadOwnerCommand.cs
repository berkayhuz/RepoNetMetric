using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record AssignLeadOwnerCommand(Guid LeadId, Guid? OwnerUserId) : IRequest<Unit>;
