using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed record DeactivateCompanyCommand(Guid CompanyId) : IRequest<Unit>;
