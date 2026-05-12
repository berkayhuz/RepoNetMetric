using NetMetric.CRM.PipelineManagement.Application.Commands;
using FluentValidation;

namespace NetMetric.CRM.PipelineManagement.Application.Validators;

public sealed class UpdateLostReasonCommandValidator : AbstractValidator<UpdateLostReasonCommand>
{
    public UpdateLostReasonCommandValidator()
    {
        RuleFor(x => x.LostReasonId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
        RuleFor(x => x.Description).MaximumLength(1024);
    }
}