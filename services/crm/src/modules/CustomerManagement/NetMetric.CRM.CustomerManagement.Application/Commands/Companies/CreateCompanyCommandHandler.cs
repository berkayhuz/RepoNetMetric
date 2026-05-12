using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed class CreateCompanyCommandHandler(ICompanyAdministrationService administrationService)
    : IRequestHandler<CreateCompanyCommand, CompanyDetailDto>
{
    public Task<CompanyDetailDto> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
        => administrationService.CreateAsync(request, cancellationToken);
}
