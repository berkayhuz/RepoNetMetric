using NetMetric.CRM.LeadManagement.Application.Abstractions.Services;
using NetMetric.CRM.LeadManagement.Contracts.DTOs;
using MediatR;

namespace NetMetric.CRM.LeadManagement.Application.Features.Conversions.Commands.ConvertLeadToCustomer;

public sealed class ConvertLeadToCustomerCommandHandler(ILeadAdministrationService administrationService)
    : IRequestHandler<ConvertLeadToCustomerCommand, LeadConversionResultDto>
{
    public Task<LeadConversionResultDto> Handle(ConvertLeadToCustomerCommand request, CancellationToken cancellationToken)
        => administrationService.ConvertToCustomerAsync(request, cancellationToken);
}
