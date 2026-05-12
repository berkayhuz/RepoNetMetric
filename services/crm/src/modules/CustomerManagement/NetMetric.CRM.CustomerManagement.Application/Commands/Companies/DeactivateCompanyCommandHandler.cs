using NetMetric.CRM.CustomerManagement.Application.Abstractions;
using MediatR;

namespace NetMetric.CRM.CustomerManagement.Application.Commands.Companies;

public sealed class DeactivateCompanyCommandHandler(ICompanyAdministrationService administrationService)
    : IRequestHandler<DeactivateCompanyCommand, Unit>
{
    public async Task<Unit> Handle(DeactivateCompanyCommand request, CancellationToken cancellationToken)
    {
        await administrationService.DeactivateAsync(request.CompanyId, cancellationToken);
        return Unit.Value;
    }
}
