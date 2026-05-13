using MediatR;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Categories;

public sealed class UpdateTicketCategoryCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<UpdateTicketCategoryCommand, TicketCategoryDto>
{
    public Task<TicketCategoryDto> Handle(UpdateTicketCategoryCommand request, CancellationToken cancellationToken)
        => administrationService.UpdateCategoryAsync(request, cancellationToken);
}
