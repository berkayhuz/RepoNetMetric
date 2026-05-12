using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed record ActivateCompanyCommand(Guid CompanyId) : IRequest<Unit>;
