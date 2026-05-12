using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using NetMetric.CRM.CustomerManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed class UpdateCompanyCommandHandler(ICompanyAdministrationService administrationService)
    : IRequestHandler<UpdateCompanyCommand, CompanyDetailDto>
{
    public Task<CompanyDetailDto> Handle(UpdateCompanyCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateAsync(request, cancellationToken);
}
