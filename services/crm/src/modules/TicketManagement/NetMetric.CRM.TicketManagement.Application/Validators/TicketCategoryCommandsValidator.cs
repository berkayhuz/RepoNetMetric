using NetMetric.CRM.TicketManagement.Application.Commands.Categories;
using FluentValidation;

namespace NetMetric.CRM.TicketManagement.Application.Validators;

public sealed class TicketCategoryCommandsValidator :
    AbstractValidator<CreateTicketCategoryCommand>
{
    public TicketCategoryCommandsValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Description).MaximumLength(500);
    }
}
