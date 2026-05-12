using NetMetric.CRM.TicketManagement.Application.Abstractions.Services;
using MediatR;


namespace NetMetric.CRM.TicketManagement.Application.Commands.Categories;

public sealed class SoftDeleteTicketCategoryCommandHandler(ITicketAdministrationService administrationService) : IRequestHandler<SoftDeleteTicketCategoryCommand>
{
    public async Task<Unit> Handle(SoftDeleteTicketCategoryCommand request, CancellationToken cancellationToken)
    {
        await administrationService.SoftDeleteCategoryAsync(request, cancellationToken);
        return Unit.Value;
    }

    Task IRequestHandler<SoftDeleteTicketCategoryCommand>.Handle(SoftDeleteTicketCategoryCommand request, CancellationToken cancellationToken)
    {
        return Handle(request, cancellationToken);
    }
}
