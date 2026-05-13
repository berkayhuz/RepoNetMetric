using MediatR;
using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using NetMetric.CRM.TicketManagement.Contracts.DTOs;

namespace NetMetric.CRM.TicketManagement.Application.Commands.Categories;

public sealed class CreateTicketCategoryCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<CreateTicketCategoryCommand, TicketCategoryDto>
{
    public Task<TicketCategoryDto> Handle(CreateTicketCategoryCommand request, CancellationToken cancellationToken)
        => administrationService.CreateCategoryAsync(request, cancellationToken);
}
