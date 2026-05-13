using MediatR;
using NetMetric.CRM.CustomerManagement.Application.Abstractions;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed class ActivateCompanyCommandHandler(ICompanyAdministrationService administrationService)
    : IRequestHandler<ActivateCompanyCommand, Unit>
{
    public async Task<Unit> Handle(ActivateCompanyCommand request, CancellationToken cancellationToken)
    {
        await administrationService.ActivateAsync(request.CompanyId, cancellationToken);
        return Unit.Value;
    }
}
