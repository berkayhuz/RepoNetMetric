using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Commands.Leads;

public sealed record LeadCapturedNotification(Guid LeadId) : INotification;
