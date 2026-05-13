using FluentValidation;
using NetMetric.Auth.Application.Features.Commands;

namespace NetMetric.Auth.Application.Validators;

public sealed class CreateWorkspaceCommandValidator : AbstractValidator<CreateWorkspaceCommand>
{
    public CreateWorkspaceCommandValidator()
    {
        RuleFor(x => x.CurrentTenantId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MinimumLength(2).MaximumLength(200);
        RuleFor(x => x.Culture).MaximumLength(16);
    }
}

public sealed class SwitchWorkspaceCommandValidator : AbstractValidator<SwitchWorkspaceCommand>
{
    public SwitchWorkspaceCommandValidator()
    {
        RuleFor(x => x.CurrentTenantId).NotEmpty();
        RuleFor(x => x.TargetTenantId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
    }
}

public sealed class ListUserWorkspaceMembershipsCommandValidator : AbstractValidator<ListUserWorkspaceMembershipsCommand>
{
    public ListUserWorkspaceMembershipsCommandValidator()
    {
        RuleFor(x => x.TenantId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
    }
}

public sealed class GetUserWorkspacePermissionsCommandValidator : AbstractValidator<GetUserWorkspacePermissionsCommand>
{
    public GetUserWorkspacePermissionsCommandValidator()
    {
        RuleFor(x => x.TenantId).NotEmpty();
        RuleFor(x => x.UserId).NotEmpty();
    }
}
