using FluentValidation;

namespace NetMetric.CRM.CustomerIntelligence.Application.Features.Customer360.Commands.AppendCustomerActivity;

public sealed class AppendCustomerActivityCommandValidator : AbstractValidator<AppendCustomerActivityCommand>
{
    public AppendCustomerActivityCommandValidator()
    {
        RuleFor(x => x.SubjectType).NotEmpty().MaximumLength(64);
        RuleFor(x => x.SubjectId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Category).NotEmpty().MaximumLength(64);
        RuleFor(x => x.Channel).MaximumLength(64);
    }
}
