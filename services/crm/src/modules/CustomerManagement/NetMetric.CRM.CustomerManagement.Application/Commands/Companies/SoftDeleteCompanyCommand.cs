using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed record SoftDeleteCompanyCommand(Guid CompanyId) : IRequest<Unit>;
